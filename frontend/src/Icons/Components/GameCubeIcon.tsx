import GameCubeSvg from "../Svg/gamecube.svg?react";

type Props = {
  size?: number;
  className?: string;
};

function GameCubeIcon({ size = 20, className }: Props) {
  return <GameCubeSvg width={size} height={size} className={className} />;
}

export default GameCubeIcon;
