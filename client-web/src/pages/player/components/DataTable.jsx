import Export from "./Export";

export const RIGHT_ALIGN = "right";
export const LEFT_ALIGN = "left";
export const DATA_TYPE = 0;
export const ICON_TYPE = 1;

export const generateHeader = function (title, align = LEFT_ALIGN) {
  return { title: title, align: align };
};

export const generateCell = function (
  value,
  type = DATA_TYPE,
  align = LEFT_ALIGN,
  link = undefined
) {
  return { value: value, align: align, type: type, link: link };
};

const generateMarkdown = function (headers, data) {
  let out = "|";

  for (const h of headers) {
    out += `${h.title.toUpperCase()} |`;
  }
  out += "\n|";

  for (const h of headers) {
    let m = h.align === RIGHT_ALIGN ? "----:" : "----";

    out += `${m} |`;
  }

  out += "\n";

  for (const row of data) {
    out += "|";
    for (const dc of row) {
      let v = dc.type === DATA_TYPE ? dc.value : "";

      out += `${v} |`;
    }

    out += "\n";
  }

  return out;
};

export const DataTable = (props) => {
  let headers = props.headers;
  let data = props.data;
  let markdown = generateMarkdown(headers, data);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((h, index) => {
              return (
                <th key={index} className={h.align}>
                  {h.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => {
            return (
              <tr key={index}>
                {d.map((rd, index) => {
                  let value = rd.value;
                  let style = {};
                  let className = [rd.align];
                  if (rd.type === ICON_TYPE) {
                    value = "";
                    style = { backgroundImage: `url(${rd.value})` };
                    className.push("data_cell_icon");
                  }

                  let tag;
                  if (rd.link) {
                    tag = <a href={rd.link}>{value}</a>;
                  } else {
                    tag = value;
                  }

                  return (
                    <td
                      key={index}
                      style={style}
                      className={className.join(" ")}
                    >
                      {tag}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Export id="meta" markdown={markdown} />
    </div>
  );
};
