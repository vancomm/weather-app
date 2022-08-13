import Icon, { BaseIconProps } from "./Icon";
import arrow from "../assets/icons/arrow.svg";

export default function GeolocationIcon({ width, height }: BaseIconProps) {
  return (
    <Icon
      width={width}
      height={height}
      source={arrow}
      customStyle="transform: translateY(-4px);"
    />
  );
}
