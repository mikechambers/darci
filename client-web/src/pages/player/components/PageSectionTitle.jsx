const headerStyle = {
  display: "flex",
  flexDirection: "column",
  //justifyContent: "flex-start",
  //alignItems: "flex-start",
};

const PageSectionTitle = (props) => {
  const description = props.description;
  const title = props.title;
  const id = props.id ? props.id : "";

  return (
    <div id={id} style={headerStyle}>
      <div className="page_section" title={description}>
        {title}
      </div>

      <hr className="page_section_title" />
    </div>
  );
};

export default PageSectionTitle;
