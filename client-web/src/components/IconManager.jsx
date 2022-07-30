import { ReactComponent as PrecisionIcon } from "./images/precision_icon.svg";
import { ReactComponent as GrenadeIcon } from "./images/grenade_icon.svg";
import { ReactComponent as MeleeIcon } from "./images/melee_icon.svg";
import { ReactComponent as SuperIcon } from "./images/super_icon.svg";
import { ReactComponent as BlankIcon } from "./images/blank_icon.svg";
import { ReactComponent as DestinyLogo } from "./images/destiny_logo.svg";

import { ReactComponent as AboutIcon } from "./images/tabler/about_icon.svg";
import { ReactComponent as PlayerIcon } from "./images/tabler/player_icon.svg";
import { ReactComponent as LeaderboardIcon } from "./images/tabler/leaderboard_icon.svg";
import { ReactComponent as SearchIcon } from "./images/tabler/search_icon.svg";

export const PRECISION_ICON = "PRECISION_ICON";
export const GRENADE_ICON = "GRENADE_ICON";
export const MELEE_ICON = "MELEE_ICON";
export const SUPER_ICON = "SUPER_ICON";
export const BLANK_ICON = "BLANK_ICON";
export const DESTINY_LOGO = "DESTINY_LOGO";

export const ABOUT_ICON = "ABOUT_ICON";
export const PLAYER_ICON = "PLAYER_ICON";
export const LEADERBOARD_ICON = "LEADERBOARD_ICON";
export const SEARCH_ICON = "SEARCH_ICON";

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
    case ABOUT_ICON:
      out = <AboutIcon title={title} width={width} style={style} />;
      break;
    case PLAYER_ICON:
      out = <PlayerIcon title={title} width={width} style={style} />;
      break;
    case LEADERBOARD_ICON:
      out = <LeaderboardIcon title={title} width={width} style={style} />;
      break;
    case SEARCH_ICON:
      out = <SearchIcon title={title} width={width} style={style} />;
      break;
    case BLANK_ICON:
    //fall through
    default:
      out = <BlankIcon style={style} title={title} />;
  }

  return out;
};

export default IconManager;
