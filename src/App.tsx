import React, { useCallback, useEffect, useState } from "react";

import { useTheme } from "./contexts/ThemeContext";

import WeatherIcon from "./components/WeatherIcon";
import CalendarIcon from "./components/CalendarIcon";
import Notification from "./components/Notification";
import ReloadButton from "./components/ReloadButton";
import GeolocationIcon from "./components/GeolocationIcon";
import WeatherSkeleton from "./components/WeatherSkeleton";
import ForecastSkeleton from "./components/ForecastSkeleton";

import getGeolocation from "./helpers/getGeolocation";
import fetchEverything from "./helpers/fetchWeatherData";
import { clear, get, set } from "./helpers/cacheHelper";

import isDev from "./utils/isDev";
import formatDate from "./utils/formatDate";
import getTimeOfDay from "./utils/getTimeOfDay";
import getMoonPhase from "./utils/getMoonPhase";
import formatTemperature from "./utils/formatTemperature";
import formatLocationData from "./utils/formatLocationData";
import { moonPhaseToFavicon, statusToFavicon } from "./utils/constants";

import {
  TimeOfDay,
  CurrentWeatherData,
  ForecastData,
  LocationData,
  TemperatureUnit,
  MoonPhase,
  isSuccessful,
  handleOption,
  AppData,
  makeSuccessful,
} from "./types";

import "./App.css";
import cn from "classnames";
import log from "./utils/log";

export default function App() {
  const {
    theme: { timeOfDay },
    setTheme,
  } = useTheme();

  const setTimeOfDay = useCallback(
    (value: TimeOfDay) => {
      setTheme((theme) => ({ ...theme, timeOfDay: value }));
    },
    [setTheme]
  );

  const [isLoading, setIsLoading] = useState(true);
  const [showGeoIcon, setShowGeoIcon] = useState(false);

  const [units, setUnits] = useState<TemperatureUnit>("C");
  const [notifications, setNotifications] = useState<string[]>([]);

  const [moonPhase, setMoonPhase] = useState<MoonPhase>("Full");

  const [currentweatherData, setCurrentWeatherData] =
    useState<CurrentWeatherData>();
  const [locationData, setLocationData] = useState<LocationData>();
  const [forecastData, setForecastData] = useState<ForecastData>();

  const swapUnits = () => {
    setUnits((state) => (state === "C" ? "F" : "C"));
  };

  const swapTimeOfDay = () => {
    setTimeOfDay(timeOfDay === "day" ? "night" : "day");
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const appendNotification = (message: string) => {
    setNotifications((state) =>
      state.includes(message) ? state : [...state, message]
    );
  };

  const fetchData = useCallback(async () => {
    const cacheOption = await get("appData");

    if (isSuccessful(cacheOption)) return cacheOption;

    const geolocationOption = await getGeolocation();

    if (!isSuccessful(geolocationOption)) return geolocationOption;

    const { latitude, longitude } = geolocationOption.value;

    log(geolocationOption.value);

    const everythingOption = await fetchEverything(latitude, longitude);

    if (!isSuccessful(everythingOption)) return everythingOption;

    const appData = {
      coordinates: { latitude, longitude },
      ...everythingOption.value,
    };

    set("appData", appData);

    return makeSuccessful(appData);
  }, []);

  const setData = useCallback(
    (data: AppData) => {
      const { coordinates, location, current, forecast } = data;
      const { latitude, longitude } = coordinates;

      const moonPhase = getMoonPhase().name;
      const timeOfDay = getTimeOfDay(latitude, longitude);

      setTimeOfDay(timeOfDay);
      setMoonPhase(moonPhase);
      setShowGeoIcon(true);

      setLocationData(location);
      setCurrentWeatherData(current);
      setForecastData(forecast);
    },
    [setTimeOfDay]
  );

  useEffect(() => {
    clearNotifications();
    setIsLoading(true);
    setShowGeoIcon(false);

    fetchData()
      .then(handleOption(setData, appendNotification))
      .then(() => setIsLoading(false));
  }, [fetchData, setData]);

  useEffect(() => {
    const title = document.querySelector("title");
    const favicon16 = document.querySelector("link#favicon-16");
    const favicon32 = document.querySelector("link#favicon-32");
    const favicon180 = document.querySelector("link#favicon-180");

    if (currentweatherData) {
      const icon =
        timeOfDay === "night"
          ? moonPhaseToFavicon[moonPhase]
          : statusToFavicon[currentweatherData.status];

      title!.innerText = locationData?.name ?? "Weather";

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
    }
  }, [locationData, moonPhase, timeOfDay, currentweatherData]);

  return (
    <div className={cn("app", { night: timeOfDay === "night" })}>
      {isDev() && (
        <div className="dev-btns">
          <div className="dev-btn" onClick={() => setIsLoading(!isLoading)}>
            <input
              type="checkbox"
              checked={isLoading}
              onChange={() => setIsLoading(!isLoading)}
            />
            loading
          </div>
          <button className="dev-btn" onClick={swapTimeOfDay}>
            {timeOfDay}
          </button>
          <button className="dev-btn danger" onClick={() => clear()}>
            clear cache
          </button>
        </div>
      )}

      {notifications?.map((message, i) => (
        <Notification key={i}>{message}</Notification>
      ))}

      {isLoading ? (
        <WeatherSkeleton />
      ) : (
        <div className="container weather">
          <div className="sub-title">Weather in</div>
          <div className="title">
            <div className="location">{formatLocationData(locationData)}</div>
            {showGeoIcon && <GeolocationIcon width={"20px"} height={"20px"} />}
            {!showGeoIcon && <ReloadButton />}
          </div>

          <hr />

          <div className="weather-icon">
            <WeatherIcon
              size={256}
              variant="white"
              time={timeOfDay}
              status={currentweatherData?.status ?? "unknown"}
            />
          </div>

          <div className="description">
            <span>{currentweatherData?.description ?? "--"}</span>
          </div>

          <div className="temperature">
            <span className="value">
              {currentweatherData
                ? formatTemperature(currentweatherData.temperature, units)
                : "--"}
              {"°"}
            </span>
            <span className="units">{units}</span>
            <span className="switch-units" onClick={swapUnits}>
              {"/"}
              {units === "C" ? "F" : "C"}
            </span>
          </div>

          <div className="feels-like">
            <span className="value">
              feels like{" "}
              {currentweatherData
                ? formatTemperature(currentweatherData.temperature, units)
                : "--"}
              {"°"}
            </span>
            <span className="units">{units}</span>
          </div>
        </div>
      )}

      {isLoading ? (
        <ForecastSkeleton />
      ) : (
        <div className="container forecast">
          <div className="header">
            <CalendarIcon width="18px" height="16px" />
            <span>forecast</span>
          </div>

          <hr />

          {forecastData?.map(({ date, status, tempMin, tempMax, pop }, i) => (
            <React.Fragment key={date.getDate() || i}>
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
                      <span className="pop">{Math.round(pop * 10) * 10}%</span>
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
