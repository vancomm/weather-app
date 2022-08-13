import calendar from "../assets/icons/calendar.svg";
import Icon, { BaseIconProps } from "./Icon";

export default function CalendarIcon({ width, height }: BaseIconProps) {
  return (
    <Icon
      width={width}
      height={height}
      source={calendar}
      customStyle="transform: translateY(1px)"
    />
  );
}
