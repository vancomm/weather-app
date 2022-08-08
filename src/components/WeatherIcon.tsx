import cn from "classnames";
import React from "react";
import "../assets/styles/wu-icons-style.css";

interface WeatherIconProps {
  variant: "black" | "white" | "solid-black" | "solid-white";
  // size: "16" | "32" | "64" | "128" | "256";
  size: number;
  time: TimeOfDay;
  status: WeatherStatus;
  // customSize?: { value: number };
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
    ></div>
  );
}
