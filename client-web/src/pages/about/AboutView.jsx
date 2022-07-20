const mainStyle = {
  height: "100%",
};

const style = {
  display: "flex",
  justifyContent: "center",
};

const paraStyle = {
  display: "flex",
  width: "50%",
  flexDirection: "column",
  justifyContent: "center",
};

const AboutView = (props) => {
  return (
    <main style={mainStyle}>
      <div style={style}>
        <div style={paraStyle}>
          <p>Created by Mike Chambers</p>
        </div>
      </div>
    </main>
  );
};

export default AboutView;
