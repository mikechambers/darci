const ErrorView = (props) => {
  if (!props.error || props.error.length) {
    return "";
  }

  return <div className="error">{props.error}</div>;
};

export default ErrorView;
