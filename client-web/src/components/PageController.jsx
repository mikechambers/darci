import { useState } from "react";
import { ReactComponent as NavFirstIcon } from "./images/nav_first_icon.svg";
import { ReactComponent as NavPrevIcon } from "./images/nav_prev_icon.svg";
import { ReactComponent as NavLastIcon } from "./images/nav_last_icon.svg";
import { ReactComponent as NavNextIcon } from "./images/nav_next_icon.svg";

const buttonStyle = {
  border: "0px",
  margin: "0px 5px",
  padding: "0px",
  background: "#FFFFFF00",
};

const buttoncontainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
};

const displayStyle = {
  padding: "0px 3px",
};

const PageController = (props) => {
  let items = props.items;
  let pageSize = props.pageSize;

  let onChange = props.onChange;
  let totalPages = Math.ceil(items.length / pageSize);
  console.log(totalPages);

  let [currentPage, setCurrentPage] = useState(0);

  const updatePage = function (page) {
    let start = pageSize * page;
    let end = start + pageSize;

    if (end > items.length) {
      end = items.length;
    }

    let out = items.slice(start, end);
    setCurrentPage(page);
    onChange(out);
  };

  const onFirstClick = function () {
    updatePage(0);
  };

  const onPreviousClick = function () {
    let page = (currentPage + totalPages - 1) % totalPages;
    updatePage(page);
  };

  const onLastClick = function () {
    updatePage(totalPages - 1);
  };

  const onNextClick = function () {
    let page = (currentPage + 1) % totalPages;
    updatePage(page);
  };

  return (
    <div style={buttoncontainerStyle}>
      <div>
        <button title="First Page" style={buttonStyle} onClick={onFirstClick}>
          <NavFirstIcon />
        </button>
        <button
          title="Previous Page"
          style={buttonStyle}
          onClick={onPreviousClick}
        >
          <NavPrevIcon />
        </button>
      </div>
      <div style={displayStyle}>{`Page ${
        currentPage + 1
      } of ${totalPages}`}</div>
      <button title="Next Page" style={buttonStyle} onClick={onNextClick}>
        <NavNextIcon />
      </button>
      <button title="Last Page" style={buttonStyle} onClick={onLastClick}>
        <NavLastIcon />
      </button>
    </div>
  );
};

export default PageController;
