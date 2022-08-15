import { CurrentWeatherData } from "./CurrentWeatherData";
import { ForecastData } from "./ForecastData";
import { LocationData } from "./LocationData";

export interface WeatherData {
  current: CurrentWeatherData;
  forecast: ForecastData;
  location: LocationData;
}
