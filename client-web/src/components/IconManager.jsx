import { ReactComponent as PrecisionIcon } from "./images/precision_icon.svg";
import { ReactComponent as GrenadeIcon } from "./images/grenade_icon.svg";
import { ReactComponent as MeleeIcon } from "./images/melee_icon.svg";
import { ReactComponent as SuperIcon } from "./images/super_icon.svg";
import { ReactComponent as BlankIcon } from "./images/blank_icon.svg";
import { ReactComponent as DestinyLogo } from "./images/destiny_logo.svg";

export const PRECISION_ICON = "PRECISION_ICON";
export const GRENADE_ICON = "GRENADE_ICON";
export const MELEE_ICON = "MELEE_ICON";
export const SUPER_ICON = "SUPER_ICON";
export const BLANK_ICON = "BLANK_ICON";
export const DESTINY_LOGO = "DESTINY_LOGO";

const IconManager = (props) => {
  let icon = props.icon;
  let width = props.width ? props.width : 10;
  let style = props.style;
  let title = props.title ? props.title : "";

  let out;
  switch (icon) {
    case PRECISION_ICON:
      out = <PrecisionIcon title={title} width={width} style={style} />;
      break;
    case GRENADE_ICON:
      out = <GrenadeIcon title={title} width={width} style={style} />;
      break;
    case MELEE_ICON:
      out = <MeleeIcon title={title} width={width} style={style} />;
      break;
    case SUPER_ICON:
      out = <SuperIcon title={title} width={width} style={style} />;
      break;
    case DESTINY_LOGO:
      out = <DestinyLogo title={title} width={width} style={style} />;
      break;
    case BLANK_ICON:
    //fall through
    default:
      out = <BlankIcon style={style} title={title} />;
  }

  return out;
};

export default IconManager;
