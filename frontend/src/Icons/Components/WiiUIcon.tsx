import WiiUSvg from "../Svg/wiiu.svg?react";

type Props = {
  size?: number;
  className?: string;
};

function WiiUIcon({ size = 20, className }: Props) {
  return <WiiUSvg width={size} height={size} className={className} />;
}

export default WiiUIcon;
