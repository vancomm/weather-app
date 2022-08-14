import { ForecastData } from "./ForecastData";
import { LocationData } from "./LocationData";
import { WeatherData } from "./WeatherData";

export interface AppData {
  geolocation: GeolocationCoordinates;
  weather: WeatherData;
  forecast: ForecastData[];
  location: LocationData;
}
