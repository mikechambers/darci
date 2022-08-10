import { CompletionReason } from "shared";
import { ReactComponent as MercyIcon } from "./images/tabler/mercy_icon.svg";
const CompletionReasonView = (props) => {
  const completionReason = props.completionReason;
  const dimension = props.dimension ? props.dimension : 18;

  let mercyIcon =
    completionReason === CompletionReason.MERCY ? (
      <MercyIcon
        width={dimension}
        height={dimension}
        title="Game ended in mercy"
      />
    ) : (
      ""
    );

  return mercyIcon;
};

export default CompletionReasonView;
