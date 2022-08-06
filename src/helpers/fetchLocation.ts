import { OpenWeatherMapRoute } from "../routes";
import { OpenWeatherMapResponse } from "./OpenWeatherMapResponse";

export default async function fetchLocation(
  latitude: string,
  longitude: string
) {
  const res = await fetch(OpenWeatherMapRoute(latitude, longitude));

  if (!res.ok) return null;

  const data: OpenWeatherMapResponse = await res.json();

  const location = data.name;
  const { sunset, sunrise } = data.sys;
  return { location, sunrise: new Date(sunrise), sunset: new Date(sunset) };
}
