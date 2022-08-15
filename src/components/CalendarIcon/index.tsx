import { ReactComponent as Calendar } from "../../assets/icons/calendar.svg";
import cn from "classnames";
import styles from "./CalendarIcon.module.css";
import { BaseIconProps } from "../../types";
import { useTheme } from "../../contexts/ThemeContext";

export default function CalendarIcon({ width, height }: BaseIconProps) {
  const { theme } = useTheme();

  const { timeOfDay } = theme;

  return (
    <Calendar
      className={cn(styles.calendarIcon, {
        [styles.night]: timeOfDay === "night",
      })}
      width={width}
      height={height}
    />
  );
}
