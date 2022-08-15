import cn from "classnames";
import React from "react";
import { TimeOfDay, WeatherStatus } from "../../types";
import "./WeatherIcon.css";

interface WeatherIconProps {
  variant: "black" | "white" | "solid-black" | "solid-white";
  size: number;
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
    <div
      className={cn("wu", `wu-${variant}`, `wu-${status}`, {
        "wu-night": time === "night",
      })}
      style={{ "--size": `${size}px` } as React.CSSProperties}
    />
  );
}
