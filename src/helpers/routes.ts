import { OpenWeatherRequestType } from "../types";

export const netlify = {
  openWeather: (type: OpenWeatherRequestType, lat: number, lon: number) =>
    `/.netlify/functions/open-weather/?type=${type}&lat=${lat}&lon=${lon}`,
  geoDb: (prefix: string) => `/.netlify/functions/geo-db?prefix=${prefix}`,
};
