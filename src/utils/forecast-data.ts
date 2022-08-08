export interface ForecastData {
  date: Option<Date>;
  tempMin: Temperature;
  tempMax: Temperature;
  status: WeatherStatus;
  pop: number;
}

export const defaultForecastData: ForecastData = {
  date: null,
  tempMin: null,
  tempMax: null,
  status: "unknown",
  pop: 0,
};
