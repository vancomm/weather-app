import React from "react";
import WeatherIcon from "./WeatherIcon";
import Placeholder from "./Placeholder";
import { useTheme } from "../contexts/ThemeContext";
import "../assets/styles/utility.css";

export default function WeatherSkeleton() {
  const {
    theme: { timeOfDay },
  } = useTheme();

  return (
    <div className="container weather skeleton">
      <div className="sub-title">Weather in</div>
      <div className="title">
        <Placeholder width="180px" height="3.5rem" />
      </div>

      <hr />

      <div className="weather-icon">
        <WeatherIcon
          size={256}
          variant="white"
          time={timeOfDay}
          status="unknown"
        />
      </div>

      <div className="description">
        <div style={{ display: "flex", gap: "10px" } as React.CSSProperties}>
          <Placeholder width="60px" height="2rem" />
          <Placeholder width="40px" height="2rem" />
        </div>
      </div>

      <div className="temperature">
        <span className="value">
          <Placeholder width="140px" height="4rem" />
        </span>
      </div>

      <div className="feels-like">
        <span className="value">
          <div style={{ display: "flex", gap: "10px" } as React.CSSProperties}>
            <Placeholder width="60px" height="29px" />
            <Placeholder width="40px" height="29px" />
            <Placeholder width="40px" height="29px" />
          </div>
        </span>
      </div>
    </div>
  );
}
