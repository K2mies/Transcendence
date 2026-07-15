import {
  BsNintendoSwitch,
  BsPlaystation,
  BsXbox,
  BsWindows,
  BsAndroid2,
} from "react-icons/bs";

import { FaSteam, FaLinux, FaApple, FaGoogle, FaCube } from "react-icons/fa";
import { SiSega, SiApplearcade } from "react-icons/si";
import { TiSpiral } from "react-icons/ti";

type PlatformIconProps = {
  platform?: string;
  size?: number;
};

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  Arcade: SiApplearcade,
  "Sega Mega Drive/Genesis": SiSega,
  "Nintendo Switch": BsNintendoSwitch,
  "Nintendo Switch 2": BsNintendoSwitch,
  "PlayStation 5": BsPlaystation,
  "PlayStation 4": BsPlaystation,
  "PlayStation 3": BsPlaystation,
  "PlayStation 2": BsPlaystation,
  "PlayStation Vita": BsPlaystation,
  PlayStation: BsPlaystation,
  "Nintendo GameCube": FaCube,
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
