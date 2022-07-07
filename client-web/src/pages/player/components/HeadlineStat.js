const HeadlineStat = (props) => {
  let label = props.label;
  let value = props.value;

  return (
    <div className="headline_stat">
      <div className="headline_stat_value">{value}</div>
      <div className="headline_stat_label">{label}</div>
    </div>
  );
};

export default HeadlineStat;
