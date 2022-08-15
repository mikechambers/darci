const rootStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: 12,
};
const LoadingAnimationView = (props) => {
  const message = props.message;
  return (
    <div style={rootStyle}>
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
      <div className="loading">{message}</div>
    </div>
  );
};

export default LoadingAnimationView;
