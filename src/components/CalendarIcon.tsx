import { ReactSVG } from "react-svg";
import calendar from "../assets/icons/calendar.svg";

interface CalendarIconProps {
  width: string;
  height: string;
}

export default function CalendarIcon({ width, height }: CalendarIconProps) {
  return (
    <ReactSVG
      beforeInjection={(svg) => {
        svg.setAttribute(
          "style",
          `width: ${width}; height: ${height}; transform: translateY(1px)`
        );
      }}
      src={calendar}
    />
  );
}
