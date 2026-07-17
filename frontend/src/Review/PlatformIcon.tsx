import {
  BsNintendoSwitch,
  BsPlaystation,
  BsXbox,
  BsWindows,
  BsAndroid2,
} from "react-icons/bs";

import { FaSteam, FaLinux, FaApple, FaGoogle, FaGamepad } from "react-icons/fa";
import { SiSega, SiApplearcade } from "react-icons/si";
import { TiSpiral } from "react-icons/ti";

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
  "Sega Mega Drive/Genesis": SiSega,

  "Super Nintendo Entertainment System": FaGamepad,
  "Super Famicom": FaGamepad,

  "Nintendo 64": Nintendo64Icon,
  "Nintendo GameCube": GameCubeIcon,

  Wii: WiiIcon,
  "Wii U": WiiUIcon,

  "Nintendo Switch": BsNintendoSwitch,
  "Nintendo Switch 2": BsNintendoSwitch,

  "Nintendo DS": NintendoIcon,
  "Nintendo 3DS": Nintendo3DsIcon,
  "New Nintendo 3DS": Nintendo3DsIcon,

  "Nintendo Game Boy": GameBoyIcon,
  "Game Boy Advance": GameBoyIcon,

  "PlayStation 5": BsPlaystation,
  "PlayStation 4": BsPlaystation,
  "PlayStation 3": BsPlaystation,
  "PlayStation 2": BsPlaystation,
  PlayStation: BsPlaystation,

  "PlayStation Vita": BsPlaystation,

  "Xbox Series X|S": BsXbox,
  "Xbox One": BsXbox,
  "Xbox 360": BsXbox,

  Dreamcast: TiSpiral,

  "Google Stadia": FaGoogle,

  "PC (Microsoft Windows)": BsWindows,
  "Windows Phone": BsWindows,

  Linux: FaLinux,

  Mac: FaApple,
  iOS: FaApple,

  Android: BsAndroid2,

  Steam: FaSteam,
};

function PlatformIcon({ platform, size = 20 }: PlatformIconProps) {
  if (!platform) {
    return null;
  }

  const Icon = PLATFORM_ICONS[platform];

  if (!Icon) {
    return null;
  }

  return <Icon size={size} />;
}

export default PlatformIcon;
