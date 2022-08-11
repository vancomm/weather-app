import { netlify } from "./routes";
import { iconIdToTimeAndStatus } from "../utils/constants";
import {
  Optional,
  makeFailed,
  makeSuccessful,
  WeatherResponse,
  WeatherData,
  WeatherIconId,
} from "../types";

export default async function fetchWeather(
  latitude: number,
  longitude: number
): Promise<Optional<WeatherData>> {
  const res = await fetch(netlify.openWeather("weather", latitude, longitude));
  if (!res.ok) return makeFailed("Could not fetch weather data");

  try {
    const data: WeatherResponse = await res.json();

    const temperature = data.main.temp;
    const feelsLike = data.main.feels_like;
    const tempMax = data.main.temp_max;
    const tempMin = data.main.temp_min;
    const icon: WeatherIconId = data.weather[0].icon;
    const { description } = data.weather[0];

    const [, status] = iconIdToTimeAndStatus[icon];

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
