import { WeatherIconId } from "./WeatherIconId";

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coord {
  lat: number;
  lon: number;
}

interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
  rain: { "3h": number } | undefined;
  snow: { "3h": number } | undefined;
}

interface Clouds {
  all: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Sys {
  pod: string;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: WeatherIconId;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}
