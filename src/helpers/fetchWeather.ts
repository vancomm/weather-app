import { openWeather } from "./routes";
import { iconIdMap } from "../utils/maps";
import { Optional, makeFailed, makeSuccessful } from "../utils/optional";
import { WeatherResponse } from "./WeatherResponse";
import { WeatherData } from "../utils/weather-data";

export default async function fetchWeather(
  latitude: number,
  longitude: number
): Promise<Optional<WeatherData>> {
  const res = await fetch(openWeather.weatherRoute(latitude, longitude));

  if (!res.ok) return makeFailed("Could not fetch weather data");

  try {
    const data: WeatherResponse = await res.json();

    const temperature = data.main.temp;
    const feelsLike = data.main.feels_like;
    const tempMax = data.main.temp_max;
    const tempMin = data.main.temp_min;
    const icon: WeatherIconId = data.weather[0].icon;
    const { description } = data.weather[0];

    const [, status] = iconIdMap[icon];

    return makeSuccessful({
      temperature,
      feelsLike,
      tempMax,
      tempMin,
      status,
      description,
    });
  } catch (e) {
    return makeFailed("Bad weather data");
  }
}