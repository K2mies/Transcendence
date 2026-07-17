import Nintendo64Svg from "../Svg/n64.svg?react";

type Props = {
  size?: number;
  className?: string;
};

function Nintendo64Icon({ size = 20, className }: Props) {
  return <Nintendo64Svg width={size} height={size} className={className} />;
}

export default Nintendo64Icon;
