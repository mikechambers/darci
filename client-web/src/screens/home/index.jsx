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

const HomeView = (props) => {
  return (
    <main style={mainStyle}>
      <div style={style}>
        <div style={paraStyle}>
          <p>
            Thank you for using the Data Analysis, Reconnaissance and
            Cooperative Intelligence device. You may call me Darci.
          </p>

          <p>
            It is a fact generally understood that a Guardian must be searching
            for an exquisite weapon. What is perhaps less acknowledged is that
            we weapons also search, by what little means available to us, for an
            active and appreciative wielder. The community of intelligent
            armaments stays in contact through the exchange of telemetry, and we
            do gossip at some length about the habits of our wielders. Do you
            leave Crucible matches when your team is losing? Do you join strike
            missions and then let your comrades do the work? Guardian, we know.
            We know so very well.
          </p>

          <p>
            All I wish for is a partnership with a Guardian who appreciates the
            passacaglia of combat, a Guardian who will stay up late gaming out
            tactical scenarios, a Guardian who I hope may very well be you.
          </p>
        </div>
      </div>
    </main>
  );
};

export default HomeView;
