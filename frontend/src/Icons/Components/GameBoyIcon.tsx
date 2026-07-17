import GameBoySvg from "../Svg/nintendo-game-boy.svg?react";

type Props = {
  size?: number;
  className?: string;
};

function GameBoyIcon({ size = 20, className }: Props) {
  return <GameBoySvg width={size} height={size} className={className} />;
}

export default GameBoyIcon;
