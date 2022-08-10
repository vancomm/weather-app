import React, { useEffect, useState } from "react";
import WeatherIcon from "./components/WeatherIcon";
import CalendarIcon from "./components/CalendarIcon";
import WeatherSkeleton from "./components/WeatherSkeleton";
import ForecastSkeleton from "./components/ForecastPlaceholder";
import fetchWeather from "./helpers/fetchWeather";
import fetchLocation from "./helpers/fetchLocation";
import fetchForecast from "./helpers/fetchForecast";
import isDev from "./utils/isDev";
import formatDate from "./utils/formatDate";
import getTimeOfDay from "./utils/getTimeOfDay";
import formatTemperature from "./utils/formatTemperature";
import formatLocationData from "./utils/formatLocationData";
import { getMoonPhase, MoonPhase } from "./utils/getMoonPhase";
import { moonPhaseToFavicon, statusToFavicon } from "./utils/constants";
import {
  TimeOfDay,
  WeatherData,
  ForecastData,
  LocationData,
  TemperatureUnit,
  isSuccessful,
  makeSuccessful,
} from "./types";
import "./App.css";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [units, setUnits] = useState<TemperatureUnit>("C");
  const [notification, setNotification] = useState<string>();

  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");
  const [moonPhase, setMoonPhase] = useState<MoonPhase>("Full");

  const [location, setLocation] = useState<LocationData>();
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [forecastData, setForecastData] = useState<ForecastData[]>();

  const swapUnits = () => {
    setUnits(units === "C" ? "F" : "C");
  };

  const swapTimeOfDay = () => {
    if (!isDev()) return;
    setTimeOfDay(timeOfDay === "day" ? "night" : "day");
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setNotification("Your browser does not support location services");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const moonPhase = getMoonPhase().name;

        const timeOfDay = getTimeOfDay(latitude, longitude);

        setTimeOfDay(timeOfDay);
        setMoonPhase(moonPhase);

        setIsLoading(true);

        fetchLocation(latitude, longitude)
          .then((option) => {
            if (!isSuccessful(option)) return option;
            setLocation(option.value);
            return makeSuccessful({ name: option.value.name });
          })
          .then((option) => {
            return isSuccessful(option)
              ? fetchWeather(latitude, longitude)
              : option;
          })
          .then((option) => {
            if (!isSuccessful(option)) return option;
            setWeatherData(option.value);
            return option;
          })
          .then((option) => {
            return isSuccessful(option)
              ? fetchForecast(latitude, longitude)
              : option;
          })
          .then((option) => {
            if (!isSuccessful(option)) return option;
            setForecastData(option.value);
            return option;
          })
          .then((option) => {
            if (!isSuccessful(option)) {
              setNotification(option.message);
            }
            setIsLoading(false);
          });
      },
      () => {
        setNotification("Location access blocked");
        setIsLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (!weatherData) return;

    const title = document.querySelector("title");
    const favicon16 = document.querySelector("link#favicon-16");
    const favicon32 = document.querySelector("link#favicon-32");
    const favicon180 = document.querySelector("link#favicon-180");

    const icon =
      timeOfDay === "night" && weatherData.status === "sunny"
        ? moonPhaseToFavicon[moonPhase]
        : statusToFavicon[weatherData.status];

    title!.innerText = location?.name ?? "Weather";

    favicon16?.setAttribute(
      "href",
      `${process.env.PUBLIC_URL}/favicons/16/${icon}`
    );

    favicon32?.setAttribute(
      "href",
      `${process.env.PUBLIC_URL}/favicons/32/${icon}`
    );

    favicon180?.setAttribute(
      "href",
      `${process.env.PUBLIC_URL}/favicons/180/${icon}`
    );

    if (timeOfDay === "night") {
      document.querySelector("html")!.classList.add("night");
    } else {
      document.querySelector("html")!.classList.remove("night");
    }
  }, [location, moonPhase, timeOfDay, weatherData]);

  return (
    <div className="app">
      {isLoading ? (
        <WeatherSkeleton timeOfDay={timeOfDay} />
      ) : (
        <div className="container weather">
          <div className="title">Weather</div>

          <hr />

          {notification && <div className="notification">{notification}</div>}

          <div className="weather-icon" onClick={swapTimeOfDay}>
            <WeatherIcon
              size={256}
              variant="white"
              time={timeOfDay}
              status={weatherData?.status ?? "unknown"}
            />
          </div>

          <div className="temperature" onClick={swapUnits}>
            <span className="value">
              {weatherData
                ? formatTemperature(weatherData.temperature, units)
                : "--"}
              {"°"}
            </span>
            <span className="units">{units}</span>
          </div>

          <div className="feels-like">
            <span className="value">
              feels like{" "}
              {weatherData
                ? formatTemperature(weatherData.temperature, units)
                : "--"}
              {"°"}
            </span>
            <span className="units">{units}</span>
          </div>

          <div className="description">
            <span>{weatherData?.description ?? "--"}</span>
          </div>

          <hr />

          <div className="location">
            <span>{formatLocationData(location)}</span>
          </div>
        </div>
      )}

      {isLoading ? (
        <ForecastSkeleton timeOfDay={timeOfDay} />
      ) : (
        <div className="container forecast">
          <div className="header">
            <CalendarIcon width="18px" height="16px" />
            <span>forecast</span>
          </div>

          <hr />

          {forecastData?.map(({ date, status, tempMin, tempMax, pop }, i) => (
            <React.Fragment key={date?.getDate() || i}>
              {i > 0 && <hr />}
              <div className="row">
                <span className="date">{formatDate(date)}</span>
                <div className="weather-icon">
                  {/(rain)|(snow)|(storm)/.test(status) ? (
                    <>
                      <WeatherIcon
                        size={32}
                        variant="white"
                        status={status}
                        time="day"
                      />
                      <span className="pop">{Math.round(pop * 100)}%</span>
                    </>
                  ) : (
                    <WeatherIcon
                      size={48}
                      variant="white"
                      status={status}
                      time="day"
                    />
                  )}
                </div>
                <div className="temp max">
                  <span className="value">
                    {formatTemperature(tempMax, units)}
                    {"°"}
                  </span>
                </div>
                <div className="temp min">
                  <span className="value">
                    {formatTemperature(tempMin, units)}
                    {"°"}
                  </span>
                </div>
              </div>
            </React.Fragment>
          )) ?? (
            <div className="placeholder">
              <span>No data</span>
            </div>
          )}
        </div>
      )}

      <div className="credits">
        Weather data provider:{" "}
        <a href="https://openweathermap.org/">OpenWeather</a>
        <br />
        Icons by{" "}
        <a href="https://dribbble.com/shots/1879422-Weather-Underground-Icons">
          Ashley Jager
        </a>
      </div>
    </div>
  );
}
