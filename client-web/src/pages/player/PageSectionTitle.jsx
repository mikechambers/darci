const headerStyle = {
  display: "flex",
  flexDirection: "column",
  //justifyContent: "flex-start",
  //alignItems: "flex-start",
};

const PageSectionTitle = (props) => {
  const description = props.description;
  const title = props.title;

  return (
    <div style={headerStyle}>
      <div className="section_header" title={description}>
        {title}
      </div>

      <hr className="title" />
    </div>
  );
};

export default PageSectionTitle;
