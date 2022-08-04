import { useEffect, useState } from "react";
import WeatherIcon from "./components/WeatherIcon";
import convertTemp from "./utils/convert-temp";
import weatherRoute from "./routes";
import "./assets/styles/wu-icons-style.css";
import "./App.css";

async function fetchWeather(
  latitude: string,
  longitude: string
): Promise<[Temperature, WeatherIconId, string, string]> {
  return fetch(weatherRoute(latitude, longitude))
    .then((res) => res.json())
    .then((data) => {
      const temperature: Temperature = convertTemp(data.main.temp, "K", "C");
      const weatherIconId: WeatherIconId = data.weather[0].icon;
      const description: string = data.weather[0].description;
      const location: string =
        data.name + (data.sys.country ? ", " + data.sys.country : "");

      return [temperature, weatherIconId, description, location];
    });
}

export default function App() {
  const [weatherIconId, setWeatherIconId] = useState<WeatherIconId>("unknown");
  const [temperature, setTemperature] = useState<Temperature>(null);
  const [units, setUnits] = useState<TemperatureUnit>("C");
  const [description, setDescription] = useState("-");
  const [location, setLocation] = useState("-");

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

  useEffect(() => {
    if (!navigator.geolocation) {
      setNotification("Your browser does not support location services");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude.toString(10), longitude.toString(10)).then(
          ([t, w, d, l]) => {
            setUnits("C");
            setTemperature(t);
            setWeatherIconId(w);
            setDescription(d);
            setLocation(l === "" ? "Unknown location" : l);
          }
        );
      },
      () => {
        setNotification("Location access blocked");
      }
    );
  }, []);

  return (
    <div className="app">
      <div className="container">
        <div className="title">Weather</div>

        <hr />

        {notification && <div className="notification">{notification}</div>}

        <div className="weather-icon">
          <WeatherIcon
            size="256"
            variant="white"
            weatherIconId={weatherIconId}
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
        Weather data provider:{" "}
        <a href="https://openweathermap.org">openweathermap.org</a>
        <br />
        Icons by{" "}
        <a href="https://dribbble.com/shots/1879422-Weather-Underground-Icons">
          Ashley Jager
        </a>
      </div>
    </div>
  );
}
