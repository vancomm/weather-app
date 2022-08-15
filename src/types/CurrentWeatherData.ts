import { WeatherStatus } from "./WeatherStatus";

export interface CurrentWeatherData {
  temperature: number;
  feelsLike: number;
  tempMax: number;
  tempMin: number;
  status: WeatherStatus;
  description: string;
}
