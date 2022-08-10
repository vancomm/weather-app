import { WeatherStatus } from "./WeatherStatus";

export interface ForecastData {
  date: Date;
  tempMin: number;
  tempMax: number;
  status: WeatherStatus;
  pop: number;
}
