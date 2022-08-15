import { LocationResponse } from "./LocationResponse";
import { CurrentWeatherResponse } from "./CurrentWeatherResponse";
import { ForecastResponse } from "./ForecastResponse";
import { Optional } from "./Optional";

export interface WeatherApiResponse {
  location: Optional<LocationResponse>;
  current: Optional<CurrentWeatherResponse>;
  forecast: Optional<ForecastResponse>;
}
