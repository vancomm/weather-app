import {
  CurrentWeatherData,
  WeatherIconId,
  CurrentWeatherResponse,
} from "../types";
import { iconIdToTimeAndStatus } from "../utils/constants";

export default function parseCurrentWeatherResponse(
  data: CurrentWeatherResponse
): CurrentWeatherData {
  const temperature = data.main.temp;
  const feelsLike = data.main.feels_like;
  const tempMax = data.main.temp_max;
  const tempMin = data.main.temp_min;
  const icon: WeatherIconId = data.weather[0].icon;
  const { description } = data.weather[0];

  const [, status] = iconIdToTimeAndStatus[icon];

  return {
    temperature,
    feelsLike,
    tempMax,
    tempMin,
    status,
    description,
  };
}
