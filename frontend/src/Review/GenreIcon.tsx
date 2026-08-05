import { BsBackpack4Fill } from "react-icons/bs";
import { IoExtensionPuzzle, IoChatbubbleEllipses } from "react-icons/io5";
import { GiPlatform } from "react-icons/gi";
import { FaGun } from "react-icons/fa6";
import { FaMousePointer, FaFistRaised } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { RiTreasureMapFill } from "react-icons/ri";
import { MdWatchLater } from "react-icons/md";
import { GiBrain } from "react-icons/gi";
import { FaChessKnight } from "react-icons/fa";
import { LuSwords } from "react-icons/lu";
import { MdDriveEta } from "react-icons/md";
import { SiApplearcade } from "react-icons/si";
import { IoFootballSharp } from "react-icons/io5";

type GenreIconProps = {
  genre?: string;
  size?: number;
};

const GENRE_ICONS: Record<string, React.ElementType> = {
  Adventure: BsBackpack4Fill,
  Puzzle: IoExtensionPuzzle,
  Platform: GiPlatform,
  Shooter: FaGun,
  "Role-playing (RPG)": IoChatbubbleEllipses,
  Indie: TiPencil,
  "Point-and-click": FaMousePointer,
  Strategy: RiTreasureMapFill,
  "Real Time Strategy (RTS)": MdWatchLater,
  "Turn-based strategy (TBS)": FaChessKnight,
  Tactical: GiBrain,
  "Hack and slash/Beat 'em up": LuSwords,
  MOBA: LuSwords,
  Simulator: MdDriveEta,
  Racing: MdDriveEta,
  Arcade: SiApplearcade,
  Sport: IoFootballSharp,
  Fighting: FaFistRaised,
};

function GenreIcon({ genre, size = 20 }: GenreIconProps) {
  if (!genre) {
    return null;
  }

  const Icon = GENRE_ICONS[genre];

  if (!Icon) {
    return null;
  }

  return <Icon size={size} aria-hidden="true" focusable="false" />;
}

export default GenreIcon;
