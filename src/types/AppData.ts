import { WeatherData } from "./WeatherData";

export interface AppData extends WeatherData {
  geolocation: GeolocationCoordinates;
}
