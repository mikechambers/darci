const listStyle = {
  listStyle: "none",
  paddingLeft: "0px",
};
const ListView = (props) => {
  const items = props.items;
  const title = props.title;

  const titleDiv = title ? (
    <div className="list_subtitle">
      {title}
      <hr className="underline" />
    </div>
  ) : (
    ""
  );
  return (
    <div>
      {titleDiv}
      <ul style={listStyle}>
        {items.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
};

export default ListView;
