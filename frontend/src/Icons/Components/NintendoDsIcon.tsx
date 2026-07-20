import NintendoDsSvg from "../Svg/nintendods.svg?react";

type Props = {
  size?: number;
  className?: string;
};

function NintendoDsIcon({ size = 20, className }: Props) {
  return <NintendoDsSvg width={size} height={size} className={className} />;
}

export default NintendoDsIcon;
