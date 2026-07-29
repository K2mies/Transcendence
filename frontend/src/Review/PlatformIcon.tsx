import {
  BsNintendoSwitch,
  BsPlaystation,
  BsXbox,
  BsWindows,
  BsAndroid2,
  BsHeadsetVr,
} from "react-icons/bs";

import {
  FaSteam,
  FaLinux,
  FaApple,
  FaGoogle,
  FaGamepad,
  FaMobile,
} from "react-icons/fa";

import { SiSega, SiApplearcade, SiAtari, SiCommodore } from "react-icons/si";
import { TiSpiral, TiTick } from "react-icons/ti";

import { BiSolidTerminal } from "react-icons/bi";
import { RiCursorFill } from "react-icons/ri";

//custom svg icons
import Nintendo64Icon from "../Icons/Components/Nintendo64Icon";
import GameCubeIcon from "../Icons/Components/GameCubeIcon";
import GameBoyIcon from "../Icons/Components/GameBoyIcon";
import NintendoIcon from "../Icons/Components/NintendoIcon";
import Nintendo3DsIcon from "../Icons/Components/Nintendo3DsIcon";
import WiiIcon from "../Icons/Components/WiiIcon";
import WiiUIcon from "../Icons/Components/WiiUIcon";

type PlatformIconProps = {
  platform?: string;
  size?: number;
};

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  Arcade: SiApplearcade,
  "Neo Geo AES": SiApplearcade,
  "Neo Geo MVS": SiApplearcade,

  "Sega Mega Drive/Genesis": SiSega,
  "Sega Saturn": SiSega,
  "Sega CD": SiSega,

  "Super Nintendo Entertainment System": FaGamepad,
  "Family Computer": FaGamepad,
  "Super Famicom": FaGamepad,
  Satellaview: FaGamepad,

  "Nintendo 64": Nintendo64Icon,
  "64DD": Nintendo64Icon,
  "Nintendo GameCube": GameCubeIcon,

  Wii: WiiIcon,
  "Wii U": WiiUIcon,

  "Nintendo Switch": BsNintendoSwitch,
  "Nintendo Switch 2": BsNintendoSwitch,

  "Nintendo DSi": NintendoIcon,
  "Nintendo DS": NintendoIcon,
  "Nintendo 3DS": Nintendo3DsIcon,
  "New Nintendo 3DS": Nintendo3DsIcon,

  "Game Boy": GameBoyIcon,
  "Nintendo Game Boy": GameBoyIcon,
  "Game Boy Advance": GameBoyIcon,
  "Game Boy Color": GameBoyIcon,

  "PlayStation 5": BsPlaystation,
  "PlayStation 4": BsPlaystation,
  "PlayStation 3": BsPlaystation,
  "PlayStation 2": BsPlaystation,
  PlayStation: BsPlaystation,

  "PlayStation Vita": BsPlaystation,
  "PlayStation Portable": BsPlaystation,
  "Playstation PSP": BsPlaystation,

  "PlayStation VR": BsPlaystation,
  "PlayStation VR2": BsPlaystation,

  "Xbox Series X|S": BsXbox,
  "Xbox One": BsXbox,
  "Xbox 360": BsXbox,
  Xbox: BsXbox,

  Dreamcast: TiSpiral,

  "Google Stadia": FaGoogle,

  "PC (Microsoft Windows)": BsWindows,
  "PC-9800 Series": BsWindows,
  "FM Towns": BsWindows,

  DOS: BiSolidTerminal,

  Linux: FaLinux,

  "Apple II": FaApple,
  Mac: FaApple,
  iOS: FaApple,

  Amiga: TiTick,
  "Amiga CD32": TiTick,

  "Atari ST/STE": SiAtari,
  "Atari Jaguar": SiAtari,

  "Commodore C64/128/MAX": SiCommodore,

  "Windows Phone": BsWindows,
  "Windows Mixed Reality": BsWindows,
  "Legacy Mobile Device": FaMobile,

  Android: BsAndroid2,

  "N-Gage": FaGamepad,
  "Tapwave Zodiac": FaGamepad,

  "Oculus Quest": BsHeadsetVr,
  "Oculus Rift": BsHeadsetVr,

  "Meta Quest 2": BsHeadsetVr,
  "Meta Quest 3": BsHeadsetVr,

  SteamVR: BsHeadsetVr,

  Steam: FaSteam,
  "Steam Deck": FaSteam,

  "Web browser": RiCursorFill,
  "OnLive Game System": RiCursorFill,
  Ouya: RiCursorFill,
};

function PlatformIcon({ platform, size = 20 }: PlatformIconProps) {
  if (!platform) {
    return null;
  }

  const Icon = PLATFORM_ICONS[platform];

  if (!Icon) {
    return null;
  }

  return <Icon size={size} aria-hidden="true" focusable="false" />;
}

export default PlatformIcon;
