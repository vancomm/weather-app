import { WeatherStatus } from "./WeatherStatus";

export type ForecastData = ForecastItem[];

interface ForecastItem {
  date: Date;
  tempMin: number;
  tempMax: number;
  status: WeatherStatus;
  pop: number;
}
