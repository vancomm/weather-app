import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import WeatherIcon from "./components/WeatherIcon";
import cn from "classnames";
import fetchWeather from "./helpers/fetchWeather";
import convertTemp from "./utils/convert-temp";
import { phaseToFavicon, statusToFavicon } from "./utils/maps";
import fetchLocation from "./helpers/fetchLocation";
import { isSuccessful } from "./utils/optional";
import "./assets/styles/wu-icons-style.css";
import "./App.css";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [weatherStatus, setWeatherStatus] = useState<WeatherStatus>("unknown");
  const [temperature, setTemperature] = useState<Temperature>(null);
  const [time, setTime] = useState<TimeOfDay>("day");
  const [units, setUnits] = useState<TemperatureUnit>("C");
  const [description, setDescription] = useState("-");
  const [location, setLocation] = useState("Weather");

  const [moonPhase, setMoonPhase] = useState<MoonPhase>("Full Moon");

  const [notification, setNotification] = useState<Option<string>>();

  const swapUnits = () => {
    if (units === "C") {
      setUnits("F");
      setTemperature(convertTemp(temperature, "C", "F"));
    } else {
      setUnits("C");
      setTemperature(convertTemp(temperature, "F", "C"));
    }
  };

  const setNight = () => {
    document.querySelector("html")?.classList.add("night");
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setNotification("Your browser does not support location services");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        fetchLocation(latitude.toString(10), longitude.toString(10))
          .then((option) => {
            if (!isSuccessful(option)) return option;
            const { time, name } = option.value;
            setTime(time);
            if (time === "night") setNight();
            setLocation(name === "" ? "Unknown location" : name);
            return option;
          })
          .then(fetchWeather)
          .then((option) => {
            if (!isSuccessful(option)) return option;

            const {
              temperature: tmp,
              description: desc,
              moonPhase: phase,
              status,
            } = option.value;

            setUnits("C");
            setTemperature(tmp);
            setWeatherStatus(status);
            setDescription(desc);
            setMoonPhase(phase);
            setIsLoading(false);

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
    const icon =
      time === "night" && weatherStatus === "sunny"
        ? phaseToFavicon[moonPhase]
        : statusToFavicon[weatherStatus];

    const favicon16 = document.querySelector("link#favicon-16");
    favicon16?.setAttribute(
      "href",
      `${process.env.PUBLIC_URL}/favicons/16/${icon}`
    );
    const favicon32 = document.querySelector("link#favicon-32");
    favicon32?.setAttribute(
      "href",
      `${process.env.PUBLIC_URL}/favicons/32/${icon}`
    );

    const title = document.querySelector("title");
    title!.innerText = location.split(",")[0];
  }, [weatherStatus, location, moonPhase, time]);

  return (
    <div className="app">
      <div className={cn("container", { loading: isLoading })}>
        <div className="spinner">
          <TailSpin color="#ffffff" />
        </div>
        <div className="title">Weather</div>

        <hr />

        {notification && <div className="notification">{notification}</div>}

        <div className="weather-icon">
          <WeatherIcon
            size="256"
            variant="white"
            time={time}
            status={weatherStatus}
          />
        </div>

        <div className="t-value" onClick={swapUnits}>
          <span className="value">
            {temperature ? Math.floor(temperature) : "-"}°
          </span>
          <span className="units">{units}</span>
        </div>

        <div className="t-desc">{description}</div>

        <hr />

        <div className="location">{location}</div>
      </div>

      <div className="credits">
        Weather data provider: <a href="https://wttr.in">wttr.in</a>
        <br />
        Icons by{" "}
        <a href="https://dribbble.com/shots/1879422-Weather-Underground-Icons">
          Ashley Jager
        </a>
      </div>
    </div>
  );
}
