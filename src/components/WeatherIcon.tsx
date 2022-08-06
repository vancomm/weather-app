import cn from "classnames";

interface WeatherIconProps {
  variant: "black" | "white" | "solid-black" | "solid-white";
  size: "16" | "32" | "64" | "128" | "256";
  time: TimeOfDay;
  status: WeatherStatus;
}

export default function WeatherIcon({
  variant,
  size,
  time,
  status,
}: WeatherIconProps) {
  return (
    <i
      className={cn("wu", `wu-${variant}`, `wu-${status}`, `wu-${size}`, {
        "wu-night": time === "night",
      })}
    ></i>
  );
}
