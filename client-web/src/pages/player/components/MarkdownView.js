const MarkdownView = (props) => {
  let markdown = props.markdown;
  let id = `md_${props.id}`;
  let button_id = `md_button_${props.id}`;

  let handleClick = function () {
    let p = document.getElementById(id);

    let display = p.style.display;

    let newDisplay = "none";
    let buttonLabel = "View Markdown";
    if (display === "none") {
      newDisplay = "block";
      buttonLabel = "Hide Markdown";
    }

    p.style.display = newDisplay;

    let b = document.getElementById(button_id);
    b.innerHTML = buttonLabel;
  };

  return (
    <div>
      <button id={button_id} onClick={handleClick}>
        View Markdown
      </button>
      <textarea
        readOnly
        id={id}
        rows="16"
        cols="75"
        style={{ display: "none" }}
        value={markdown}
      />
    </div>
  );
};

export default MarkdownView;
