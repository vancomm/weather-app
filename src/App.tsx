import React, { useEffect, useState } from "react";
import WeatherIcon from "./components/WeatherIcon";
import CalendarIcon from "./components/CalendarIcon";
import WeatherSkeleton from "./components/WeatherSkeleton";
import ForecastSkeleton from "./components/ForecastPlaceholder";
import fetchWeather from "./helpers/fetchWeather";
import fetchLocation from "./helpers/fetchLocation";
import fetchForecast from "./helpers/fetchForecast";
import formatDate from "./utils/format-date";
import getTimeOfDay from "./utils/get-time-of-day";
import getMoonPhase from "./utils/get-moon-phase";
import formatTemperature from "./utils/format-temperature";
import { isSuccessful, makeSuccessful } from "./utils/optional";
import { WeatherData, defaultWeatherData } from "./utils/weather-data";
import { ForecastData, defaultForecastData } from "./utils/forecast-data";
import { moonPhaseToFavicon, statusToFavicon } from "./utils/maps";
import {
  LocationData,
  defaultLocationData,
  formatLocationData,
} from "./utils/location-data";
import "./App.css";
import useClickPreventionOnDoubleClick from "./hooks/use-click-prevention-on-double-click";

export default function App() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");
  const [moonPhase, setMoonPhase] = useState<MoonPhase>("Full");

  const [location, setLocation] = useState<LocationData>(defaultLocationData);

  const [weatherData, setWeatherData] =
    useState<WeatherData>(defaultWeatherData);

  const [forecastData, setForecastData] = useState<ForecastData[]>(
    Array(4).fill(defaultForecastData)
  );

  const [isLoading, setIsLoading] = useState(true);
  const [units, setUnits] = useState<TemperatureUnit>("C");

  const [notification, setNotification] = useState<Option<string>>();

  const swapUnits = () => {
    setUnits(units === "C" ? "F" : "C");
  };

  const copyTemperature = () => {
    navigator.clipboard.writeText(
      `${formatTemperature(weatherData.temperature, units)}°${units}`
    );
  };

  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
    swapUnits,
    copyTemperature,
    150
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      setNotification("Your browser does not support location services");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const moonPhase = getMoonPhase();

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
    const title = document.querySelector("title");
    const favicon16 = document.querySelector("link#favicon-16");
    const favicon32 = document.querySelector("link#favicon-32");
    const favicon180 = document.querySelector("link#favicon-180");

    const icon =
      timeOfDay === "night" && weatherData.status === "sunny"
        ? moonPhaseToFavicon[moonPhase]
        : statusToFavicon[weatherData.status];

    title!.innerText = location.name === "" ? "Weather" : location.name;

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
      document.querySelector("html")?.classList.add("night");
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

          <div className="weather-icon">
            <WeatherIcon
              size={256}
              variant="white"
              time={timeOfDay}
              status={weatherData.status}
            />
          </div>

          <div
            className="temperature"
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
          >
            <span className="value">
              {formatTemperature(weatherData.temperature, units)}
              {"°"}
            </span>
            <span className="units">{units}</span>
          </div>

          <div className="feels-like">
            <span className="value">
              feels like {formatTemperature(weatherData.feelsLike, units)}
              {"°"}
            </span>
            <span className="units">{units}</span>
          </div>

          <div className="description">
            <span>{weatherData.description}</span>
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
          {forecastData.map(({ date, status, tempMin, tempMax, pop }, i) => (
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
                        time={timeOfDay}
                      />
                      <span className="pop">{Math.round(pop * 100)}%</span>
                    </>
                  ) : (
                    <WeatherIcon
                      size={48}
                      variant="white"
                      status={status}
                      time={timeOfDay}
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
          ))}
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
