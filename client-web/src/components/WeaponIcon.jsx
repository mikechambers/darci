import { ItemSubType, type } from "shared";
import { ReactComponent as AutoRifleIcon } from "./images/autorifle_icon.svg";
import { ReactComponent as BowIcon } from "./images/bow_icon.svg";
import { ReactComponent as FusionRifleIcon } from "./images/fusion_rifle_icon.svg";
import { ReactComponent as Glaivecon } from "./images/glaive_icon.svg";
import { ReactComponent as HandCanonIcon } from "./images/hand_canon_icon.svg";
import { ReactComponent as HeavyGrenadeLauncherIcon } from "./images/heavy_grenade_launcher_icon.svg";
import { ReactComponent as LinearFusionRifleIcon } from "./images/linear_fusion_rifle_icon.svg";
import { ReactComponent as MachineGunIcon } from "./images/machine_gun_icon.svg";
import { ReactComponent as PulseRifleIcon } from "./images/pulse_rifle_icon.svg";
import { ReactComponent as RocketLauncherIcon } from "./images/rocket_launcher_icon.svg";
import { ReactComponent as ScoutRifleIcon } from "./images/scout_rifle_icon.svg";
import { ReactComponent as ShotgunIcon } from "./images/shotgun_icon.svg";
import { ReactComponent as SidearmIcon } from "./images/sidearm_icon.svg";
import { ReactComponent as SniperRifleIcon } from "./images/sniper_rifle_icon.svg";
import { ReactComponent as SubmachineGunIcon } from "./images/submachine_gun_icon.svg";
import { ReactComponent as SwordIcon } from "./images/sword_icon.svg";
import { ReactComponent as TraceRifleIcon } from "./images/trace_rifle_icon.svg";
import { ReactComponent as BlankIcon } from "./images/blank_icon.svg";

const WeaponIcon = (props) => {
  let type = props.type;
  let width = props.width ? props.width : 22;

  let out;
  switch (type) {
    case ItemSubType.AUTO_RIFLE:
      out = <AutoRifleIcon title={type.label} width={width} />;
      break;
    case ItemSubType.FUSION_RIFLE:
      out = <FusionRifleIcon title={type.label} width={width} />;
      break;
    case ItemSubType.BOW:
      out = <BowIcon title={type.label} width={width} />;
      break;
    case ItemSubType.GLAIVE:
      out = <Glaivecon title={type.label} width={width} />;
      break;
    case ItemSubType.HAND_CANNON:
      out = <HandCanonIcon title={type.label} width={width} />;
      break;
    case ItemSubType.GRENADE_LAUNCHER:
      out = <HeavyGrenadeLauncherIcon title={type.label} width={width} />;
      break;
    case ItemSubType.LINEAR_FUSION_RIFLE:
      out = <LinearFusionRifleIcon title={type.label} width={width} />;
      break;
    case ItemSubType.MACHINE_GUN:
      out = <MachineGunIcon title={type.label} width={width} />;
      break;
    case ItemSubType.PULSE_RIFLE:
      out = <PulseRifleIcon title={type.label} width={width} />;
      break;
    case ItemSubType.ROCKET_LAUNCHER:
      out = <RocketLauncherIcon title={type.label} width={width} />;
      break;
    case ItemSubType.SCOUT_RIFLE:
      out = <ScoutRifleIcon title={type.label} width={width} />;
      break;
    case ItemSubType.SHOTGUN:
      out = <ShotgunIcon title={type.label} width={width} />;
      break;
    case ItemSubType.SIDEARM:
      out = <SidearmIcon title={type.label} width={width} />;
      break;
    case ItemSubType.SNIPER_RIFLE:
      out = <SniperRifleIcon title={type.label} width={width} />;
      break;
    case ItemSubType.SUBMACHINE_GUN:
      out = <SubmachineGunIcon title={type.label} width={width} />;
      break;
    case ItemSubType.SWORD:
      out = <SwordIcon title={type.label} width={width} />;
      break;
    case ItemSubType.TRACE_RIFLE:
      out = <TraceRifleIcon title={type.label} width={width} />;
      break;
    default:
      out = <BlankIcon width={width} />;
  }

  return out;
};

export default WeaponIcon;
