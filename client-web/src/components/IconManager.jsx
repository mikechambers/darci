import { ReactComponent as PrecisionIcon } from "./images/precision_icon.svg";
import { ReactComponent as GrenadeIcon } from "./images/grenade_icon.svg";
import { ReactComponent as MeleeIcon } from "./images/melee_icon.svg";
import { ReactComponent as SuperIcon } from "./images/super_icon.svg";

export const PRECISION_ICON = "PRECISION_ICON";
export const GRENADE_ICON = "GRENADE_ICON";
export const MELEE_ICON = "MELEE_ICON";
export const SUPER_ICON = "SUPER_ICON";

const IconManager = (props) => {
  let icon = props.icon;
  let width = props.width ? props.width : 10;

  let out;
  switch (icon) {
    case PRECISION_ICON:
      out = <PrecisionIcon title="Precision Kills" width={width} />;
      break;
    case GRENADE_ICON:
      out = <GrenadeIcon title="Grenade Kills" width={width} />;
      break;
    case MELEE_ICON:
      out = <MeleeIcon title="Melee Kills" width={width} />;
      break;
    case SUPER_ICON:
      out = <SuperIcon title="Super Kills" width={width} />;
      break;
    default:
      out = <div />;
  }

  return out;
};

export default IconManager;
