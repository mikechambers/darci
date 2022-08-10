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
          <p>
            darci is a self hosted platform for aggregating, viewing and
            analyzing Destiny 2 PVP stats.
          </p>
          <p>
            It is currently under development, and is{" "}
            <a href="https://github.com/mikechambers/dcli">available</a> under
            an{" "}
            <a href="https://github.com/mikechambers/darci/blob/main/LICENSE.md">
              MIT Open Source License
            </a>
            .
          </p>
          <p>
            If you run into an issue, or have suggestions or feature requests
            please share them{" "}
            <a href="https://github.com/mikechambers/darci/issues">here</a>.
          </p>
          <p>
            Created by <a href="http://www.mikechambers.com">Mike Chambers</a>.
            [<a href="https://twitter.com/mesh">Twitter</a>] | [
            <a href="https://github.com/mikechambers/">Github</a>]
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutView;
