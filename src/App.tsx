import React, { useCallback, useEffect, useState } from "react";
import produce from "immer";

import WeatherIcon from "./components/WeatherIcon";
import CalendarIcon from "./components/CalendarIcon";
import GeolocationIcon from "./components/GeolocationIcon";
import WeatherSkeleton from "./components/WeatherSkeleton";
import ForecastSkeleton from "./components/ForecastPlaceholder";

import fetchWeather from "./helpers/fetchWeather";
import fetchLocation from "./helpers/fetchLocation";
import fetchForecast from "./helpers/fetchForecast";
import getGeolocation from "./helpers/getGeolocation";
import { CacheKeyMap, clear, get, set } from "./helpers/cacheHelper";

import isDev from "./utils/isDev";
import formatDate from "./utils/formatDate";
import getTimeOfDay from "./utils/getTimeOfDay";
import getMoonPhase from "./utils/getMoonPhase";
import formatTemperature from "./utils/formatTemperature";
import formatLocationData from "./utils/formatLocationData";
import { moonPhaseToFavicon, statusToFavicon } from "./utils/constants";

import {
  TimeOfDay,
  WeatherData,
  ForecastData,
  LocationData,
  TemperatureUnit,
  MoonPhase,
  isSuccessful,
  Optional,
  handleOption,
} from "./types";

import "./App.css";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [units, setUnits] = useState<TemperatureUnit>("C");
  const [notifications, setNotifications] = useState<string[]>([]);

  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");
  const [moonPhase, setMoonPhase] = useState<MoonPhase>("Full");

  // const [geolocation, setGeolocation] = useState<GeolocationCoordinates>();

  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [locationData, setLocationData] = useState<LocationData>();
  const [forecastData, setForecastData] = useState<ForecastData[]>();

  const swapUnits = () => {
    setUnits(units === "C" ? "F" : "C");
  };

  const swapTimeOfDay = () => {
    if (!isDev()) return;
    setTimeOfDay(timeOfDay === "day" ? "night" : "day");
  };

  const appendNotification = (message: string) => {
    setNotifications(
      produce((state) => {
        if (state.includes(message)) return;
        state.push(message);
      })
    );
  };

  const tryGetCachedValue = async <
    K extends keyof CacheKeyMap,
    T extends CacheKeyMap[K]
  >(
    cacheKey: K,
    fallbackFn?: () => Promise<Optional<T>>
  ): Promise<Optional<T>> => {
    const cacheOption = await get<K, T>(cacheKey);

    if (isSuccessful(cacheOption) || !fallbackFn) return cacheOption;

    const valueOption = await fallbackFn();

    if (isSuccessful(valueOption)) set(cacheKey, valueOption.value);

    return valueOption;
  };

  // const _fetchData = async (): Promise<Optional<AppData>> => {
  //   const cacheOption = await get("appData");
  //   if (isSuccessful(cacheOption)) return cacheOption;
  //   const geolocationOption = await getGeolocation();
  //   if (!isSuccessful(geolocationOption)) return geolocationOption;
  //   const { latitude, longitude } = geolocationOption.value;
  //   return Promise.all([
  //     fetchLocation(latitude, longitude),
  //     fetchWeather(latitude, longitude),
  //     fetchForecast(latitude, longitude),
  //   ]).then(([locationOption, weatherOption, forecastOption]) => {
  //     if (!isSuccessful(lo))
  //   });
  // };

  const fetchData = useCallback(async () => {
    const geolocationOption = await tryGetCachedValue(
      "geolocation",
      getGeolocation
    );

    if (!isSuccessful(geolocationOption)) {
      appendNotification(geolocationOption.message);
      return;
    }

    const { latitude, longitude } = geolocationOption.value;

    const moonPhase = getMoonPhase().name;
    const timeOfDay = getTimeOfDay(latitude, longitude);

    setTimeOfDay(timeOfDay);
    setMoonPhase(moonPhase);

    return Promise.all([
      tryGetCachedValue("location", () =>
        fetchLocation(latitude, longitude)
      ).then(handleOption(setLocationData, appendNotification)),
      tryGetCachedValue("weather", () =>
        fetchWeather(latitude, longitude)
      ).then(handleOption(setWeatherData, appendNotification)),
      tryGetCachedValue("forecast", () =>
        fetchForecast(latitude, longitude)
      ).then(handleOption(setForecastData, appendNotification)),
    ]);
  }, []);

  useEffect(() => {
    setNotifications([]);
    setIsLoading(true);

    fetchData().then(() => setIsLoading(false));
  }, [fetchData]);

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

    if (timeOfDay === "night") {
      document.querySelector("html")!.classList.add("night");
    } else {
      document.querySelector("html")!.classList.remove("night");
    }
  }, [locationData, moonPhase, timeOfDay, weatherData]);

  return (
    <div className="app">
      {isDev() && (
        <div className="dev-btns">
          <button className="dev-btn" onClick={() => setIsLoading(!isLoading)}>
            {isLoading ? "loading" : "not loading"}
          </button>
          <button className="dev-btn" onClick={swapTimeOfDay}>
            {timeOfDay}
          </button>
          <button className="dev-btn danger" onClick={() => clear()}>
            clear cache
          </button>
        </div>
      )}

      {isLoading ? (
        <WeatherSkeleton timeOfDay={timeOfDay} />
      ) : (
        <div className="container weather">
          <div className="sub-title">Weather in</div>
          <div className="title">
            <div className="location">{formatLocationData(locationData)}</div>
            <GeolocationIcon width={"20px"} height={"20px"} />
          </div>

          <hr />

          {notifications?.map((message, i) => (
            <div key={i} className="notification">
              {message}
            </div>
          ))}

          <div className="weather-icon">
            <WeatherIcon
              size={256}
              variant="white"
              time={timeOfDay}
              status={weatherData?.status ?? "unknown"}
            />
          </div>

          <div className="description">
            <span>{weatherData?.description ?? "--"}</span>
          </div>

          <div className="temperature">
            <span className="value">
              {weatherData
                ? formatTemperature(weatherData.temperature, units)
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
              {weatherData
                ? formatTemperature(weatherData.temperature, units)
                : "--"}
              {"°"}
            </span>
            <span className="units">{units}</span>
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
