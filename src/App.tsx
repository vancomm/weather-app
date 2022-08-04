import { useEffect, useState } from "react";
import WeatherIcon from "./components/WeatherIcon";
import convertTemp from "./utils/convert-temp";
import weatherRoute from "./routes";
import "./assets/styles/wu-icons-style.css";
import "./App.css";

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
    const getWeather = async (latitude: number, longitude: number) => {
      fetch(weatherRoute(latitude.toString(10), longitude.toString(10)))
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const temp = convertTemp(data.main.temp, "K", "C");
          const weatherIconId = data.weather[0].icon;
          const description = data.weather[0].description;
          const locationName =
            data.name + (data.sys.country ? ", " + data.sys.country : "");

          setUnits("C");
          setTemperature(temp);
          setWeatherIconId(weatherIconId);
          setDescription(description);
          setLocation(locationName === "" ? "Unknown location" : locationName);
        });
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeather(latitude, longitude);
        },
        () => {
          setNotification("Location access blocked");
        }
      );
    } else {
      setNotification("Your browser does not support location services");
    }
  }, []);

  return (
    <div className="app">
      <div className="container">
        <div className="title">Weather</div>
        {notification && <div className="notification">{notification}</div>}
        <div className="weather-container">
          <div className="weather-icon">
            <WeatherIcon
              size="256"
              variant="black"
              weatherIconId={weatherIconId}
            />
          </div>
          <div className="t-value" onClick={swapUnits}>
            {temperature ? Math.floor(temperature) : "-"}°{units}
          </div>
          <div className="t-desc">{description}</div>
          <div className="location">{location}</div>
        </div>
      </div>
    </div>
  );
}
