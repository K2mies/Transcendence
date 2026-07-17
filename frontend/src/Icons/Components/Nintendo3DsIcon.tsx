import Nintendo3DsSvg from "../Svg/nintendo-3ds.svg?react";

type Props = {
  size?: number;
  className?: string;
};

function Nintendo3DsIcon({ size = 20, className }: Props) {
  return <Nintendo3DsSvg width={size} height={size} className={className} />;
}

export default Nintendo3DsIcon;
