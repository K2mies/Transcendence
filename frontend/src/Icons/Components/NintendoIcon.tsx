import NintendoSvg from "../Svg/nintendo.svg?react";

type Props = {
  size?: number;
  className?: string;
};

function NintendoIcon({ size = 20, className }: Props) {
  return <NintendoSvg width={size} height={size} className={className} />;
}

export default NintendoIcon;
