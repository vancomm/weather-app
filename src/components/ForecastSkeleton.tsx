import React from "react";
import CalendarIcon from "./CalendarIcon";
import Placeholder from "./Placeholder";
import WeatherIcon from "./WeatherIcon";
import { useTheme } from "../contexts/ThemeContext";

export default function ForecastSkeleton() {
  const {
    theme: { timeOfDay },
  } = useTheme();

  return (
    <div className="container forecast skeleton">
      <div className="header">
        <CalendarIcon width="18px" height="16px" />
        <span>forecast</span>
      </div>
      <hr />
      {[...Array(5).keys()].map((_, i) => (
        <React.Fragment key={i}>
          {i > 0 && <hr />}
          <div className="row">
            <span className="date">
              <Placeholder
                width={`${70 + Math.sin(i * 10) * 25}px`}
                height="29px"
              />
            </span>
            <div className="weather-icon">
              <WeatherIcon
                size={48}
                variant="white"
                status="unknown"
                time={timeOfDay}
              />
            </div>
            <div className="temp max">
              <span className="value">
                <Placeholder width="35px" height="24px" />
              </span>
            </div>
            <div className="temp min">
              <span className="value">
                <Placeholder width="35px" height="24px" />
              </span>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}