import WiiSvg from "../Svg/wii.svg?react";

type Props = {
  size?: number;
  className?: string;
};

function WiiIcon({ size = 20, className }: Props) {
  return <WiiSvg width={size} height={size} className={className} />;
}

export default WiiIcon;
