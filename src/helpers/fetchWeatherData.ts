import parseForecastResponse from "../parsers/parseForecastResponse";
import parseLocationResponse from "../parsers/parseLocationResponse";
import parseCurrentWeatherResponse from "../parsers/parseCurrentWeatherResponse";
import {
  WeatherApiResponse,
  isSuccessful,
  makeFailed,
  makeSuccessful,
  Optional,
  WeatherData,
} from "../types";
import { netlify } from "./routes";

export default async function fetchEverything(
  latitude: number,
  longitude: number
): Promise<Optional<WeatherData>> {
  const res = await fetch(netlify.openWeather(latitude, longitude));

  if (!res.ok) return makeFailed("Weather services unavailable");

  try {
    const data: WeatherApiResponse = await res.json();

    const {
      location: locationResponse,
      current: currentResponse,
      forecast: forecastResponse,
    } = data;

    if (
      !isSuccessful(locationResponse) ||
      !isSuccessful(currentResponse) ||
      !isSuccessful(forecastResponse)
    ) {
      return makeFailed("Weather services unavailable");
    }

    const weatherData: WeatherData = {
      location: parseLocationResponse(locationResponse.value),
      current: parseCurrentWeatherResponse(currentResponse.value),
      forecast: parseForecastResponse(forecastResponse.value),
    };
    return makeSuccessful(weatherData);
  } catch (e) {
    return makeFailed("Weather services unavailable");
  }
}
