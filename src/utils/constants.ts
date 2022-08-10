import WeatherStatus from "../types/WeatherStatus";
import { MoonPhase } from "./getMoonPhase";
import WeatherIconId from "../types/WeatherIconId";
import TimeOfDay from "../types/TimeOfDay";

type Favicon =
  | "Cloud.png"
  | "Cloud with Lightning and Rain.png"
  | "Cloud with Lightning.png"
  | "Cloud with Rain.png"
  | "Cloud with Snow.png"
  | "Fog.png"
  | "Snowflake.png"
  | "Sun Behind Cloud.png"
  | "Sun Behind Large Cloud.png"
  | "Sun Behind Rain Cloud.png"
  | "Sun Behind Small Cloud.png"
  | "Sun.png"
  | "Umbrella.png"
  | "Umbrella with Rain Drops.png"
  | "New Moon.png"
  | "Waxing Crescent Moon.png"
  | "First Quarter Moon.png"
  | "Waxing Gibbous Moon.png"
  | "Full Moon.png"
  | "Waning Gibbous Moon.png"
  | "Last Quarter Moon.png"
  | "Waning Crescent Moon.png";

export const statusToFavicon: Record<WeatherStatus, Favicon> = {
  chanceflurries: "Cloud with Snow.png",
  chancerain: "Sun Behind Rain Cloud.png",
  chancesleet: "Cloud with Snow.png",
  chancesnow: "Cloud with Snow.png",
  chancetstorms: "Cloud with Lightning.png",
  clear: "Sun.png",
  cloudy: "Sun Behind Large Cloud.png",
  flurries: "Snowflake.png",
  fog: "Fog.png",
  hazy: "Fog.png",
  mostlycloudy: "Sun Behind Cloud.png",
  mostlysunny: "Sun Behind Small Cloud.png",
  partlycloudy: "Sun Behind Small Cloud.png",
  partlysunny: "Sun Behind Cloud.png",
  rain: "Umbrella with Rain Drops.png",
  sleet: "Umbrella with Rain Drops.png",
  snow: "Snowflake.png",
  sunny: "Sun.png",
  tstorms: "Cloud with Lightning and Rain.png",
  unknown: "Umbrella.png",
};

export const moonPhaseToFavicon: Record<MoonPhase, Favicon> = {
  New: "New Moon.png",
  "Waxing Crescent": "Waxing Crescent Moon.png",
  "First Quarter": "First Quarter Moon.png",
  "Waxing Gibbous": "Waxing Gibbous Moon.png",
  Full: "Full Moon.png",
  "Waning Gibbous": "Waning Gibbous Moon.png",
  "Last Quarter": "Last Quarter Moon.png",
  "Waning Crescent": "Waning Crescent Moon.png",
};

export const iconIdMap: Record<WeatherIconId, [TimeOfDay, WeatherStatus]> = {
  "01d": ["day", "sunny"],
  "02d": ["day", "mostlysunny"],
  "03d": ["day", "mostlycloudy"],
  "04d": ["day", "cloudy"],
  "09d": ["day", "rain"],
  "10d": ["day", "rain"],
  "11d": ["day", "tstorms"],
  "13d": ["day", "snow"],
  "50d": ["day", "hazy"],
  "01n": ["night", "sunny"],
  "02n": ["night", "mostlysunny"],
  "03n": ["night", "mostlycloudy"],
  "04n": ["night", "cloudy"],
  "09n": ["night", "rain"],
  "10n": ["night", "rain"],
  "11n": ["night", "tstorms"],
  "13n": ["night", "snow"],
  "50n": ["night", "hazy"],
  unknown: ["day", "unknown"],
};

export const statusPriority: Record<WeatherStatus, number> = {
  tstorms: 100,
  flurries: 101,
  snow: 102,
  sleet: 103,
  rain: 104,
  chancetstorms: 200,
  chanceflurries: 201,
  chancesnow: 202,
  chancesleet: 203,
  chancerain: 204,
  fog: 250,
  hazy: 251,
  cloudy: 300,
  mostlycloudy: 301,
  partlysunny: 302,
  partlycloudy: 303,
  mostlysunny: 304,
  clear: 1001,
  sunny: 1002,
  unknown: 2000,
};
