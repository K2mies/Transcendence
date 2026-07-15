import {
  BsNintendoSwitch,
  BsPlaystation,
  BsXbox,
  BsWindows,
} from "react-icons/bs";
import { FaSteam, FaLinux, FaApple } from "react-icons/fa";

type PlatformIconProps = {
  platform?: string;
  size?: number;
};

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  "Nintendo Switch": BsNintendoSwitch,
  "PlayStation 5": BsPlaystation,
  "PlayStation 4": BsPlaystation,
  "PlayStation 3": BsPlaystation,
  "PlayStation 2": BsPlaystation,
  PlayStation: BsPlaystation,
  "Xbox Series X|S": BsXbox,
  "Xbox One": BsXbox,
  "Xbox 360": BsXbox,
  Linux: FaLinux,
  "PC (Microsoft Windows)": BsWindows,
  Mac: FaApple,
  Stea: FaSteam,
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
