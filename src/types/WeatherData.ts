import { WeatherStatus } from "./WeatherStatus";

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  tempMax: number;
  tempMin: number;
  status: WeatherStatus;
  description: string;
}
