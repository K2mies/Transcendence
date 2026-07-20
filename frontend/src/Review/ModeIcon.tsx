import { FaPerson, FaPeopleArrows, FaPeopleGroup } from "react-icons/fa6";
import { FaGlobeAmericas } from "react-icons/fa";
import { LuMonitorPause } from "react-icons/lu";

type ModeIconProps = {
  mode?: string;
  size?: number;
};

const MODE_ICONS: Record<string, React.ElementType> = {
  "Single player": FaPerson,
  Multiplayer: FaPeopleGroup,
  "Co-operative": FaPeopleArrows,
  "Split screen": LuMonitorPause,
  "Massively Multiplayer Online (MMO)": FaGlobeAmericas,
};

function ModeIcon({ mode, size = 20 }: ModeIconProps) {
  if (!mode) {
    return null;
  }

  const Icon = MODE_ICONS[mode];

  if (!Icon) {
    return null;
  }

  return <Icon size={size} />;
}

export default ModeIcon;
