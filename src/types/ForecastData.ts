import WeatherStatus from "./WeatherStatus";

export default interface ForecastData {
  date: Date;
  tempMin: number;
  tempMax: number;
  status: WeatherStatus;
  pop: number;
}
