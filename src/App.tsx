import React, { useEffect, useState } from "react";
import cn from "classnames";
import Spinner from "./components/Spinner";
import WeatherIcon from "./components/WeatherIcon";
import fetchWeather from "./helpers/fetchWeather";
import fetchLocation from "./helpers/fetchLocation";
import fetchForecast from "./helpers/fetchForecast";
import getTimeOfDay from "./utils/get-time-of-day";
import getMoonPhase from "./utils/get-moon-phase";
import { LocationData } from "./utils/location-data";
import convertTemperature from "./utils/convert-temperature";
import { phaseToFavicon, statusToFavicon } from "./utils/maps";
import { isSuccessful, makeSuccessful } from "./utils/optional";
import { defaultWeatherData, WeatherData } from "./utils/weather-data";
import { defaultLocationData, locationToString } from "./utils/location-data";
import { defaultForecastData, ForecastData } from "./utils/forecast-data";
import "./App.css";

export default function App() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("day");
  const [moonPhase, setMoonPhase] = useState<MoonPhase>("Full");

  const [location, setLocation] = useState<LocationData>(defaultLocationData);

  const [weatherData, setWeatherData] =
    useState<WeatherData>(defaultWeatherData);

  const [forecastData, setForecastData] = useState<ForecastData[]>(
    Array(4).fill(defaultForecastData)
  );

  const [isLoading, setIsLoading] = useState(false);
  const [units, setUnits] = useState<TemperatureUnit>("C");

  const [notification, setNotification] = useState<Option<string>>();

  const swapUnits = () => {
    setUnits(units === "C" ? "F" : "C");
  };

  const formatDate = (date: Option<Date>) => {
    if (!date) return "No data";
    const today = new Date();
    return date.getDate() === today.getDate()
      ? "Today"
      : date.toLocaleDateString(undefined, { weekday: "short" });
  };

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

        // fetchForecast(latitude, longitude);

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
        ? phaseToFavicon[moonPhase]
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
      <div className={cn("container weather", { loading: isLoading })}>
        <Spinner />
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

        <div className="temperature" onClick={swapUnits}>
          <span className="value">
            {weatherData.temperature
              ? convertTemperature(weatherData.temperature, units)
              : "-"}
            °
          </span>
          <span className="units">{units}</span>
        </div>

        <div className="feels-like">
          <span className="value">
            feels like{" "}
            {weatherData.feelsLike
              ? convertTemperature(weatherData.feelsLike, units)
              : "-"}
            °
          </span>
          <span className="units">{units}</span>
        </div>

        <div className="description">{weatherData.description}</div>

        <hr />

        <div className="location">{locationToString(location) || "-"}</div>
      </div>

      <div className={cn("container forecast", { loading: isLoading })}>
        <Spinner />
        {forecastData.map(({ date, status, tempMin, tempMax, pop }, i) => (
          <React.Fragment key={i}>
            {i > 0 && <hr />}
            <div className="row">
              <p className="date">{formatDate(date)}</p>
              <div className="weather-data">
                <div className="weather-icon">
                  {/(rain)|(snow)|(storm)/.test(status) ? (
                    <>
                      <WeatherIcon
                        size={32}
                        variant="white"
                        status={status}
                        time="day"
                      />
                      <span className="pop">{pop * 100}%</span>
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
                {/* <div className="temps"> */}
                <div className="temp-max">
                  <span className="value">
                    {tempMax ? convertTemperature(tempMax, units) : "-"}
                  </span>
                </div>
                <div className="temp-min">
                  <span className="value">
                    {tempMin ? convertTemperature(tempMin, units) : "-"}
                  </span>
                </div>
                {/* </div> */}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

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
