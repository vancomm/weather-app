export interface WeatherData {
  temperature: Temperature;
  feelsLike: Temperature;
  tempMax: Temperature;
  tempMin: Temperature;
  status: WeatherStatus;
  description: string;
}

export const defaultWeatherData: WeatherData = {
  temperature: null,
  feelsLike: null,
  tempMax: null,
  tempMin: null,
  status: "unknown",
  description: "-",
};
