import { WeatherData } from "./WeatherData";

export interface AppData extends WeatherData {
  coordinates: {
    latitude: number;
    longitude: number;
  };
}
