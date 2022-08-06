import { OpenWeatherMapRoute } from "../routes";
import { OpenWeatherMapResponse } from "./OpenWeatherMapResponse";
import getTimeOfDay from "../utils/get-time-of-day";
import { makeFailed, makeSuccessful } from "../utils/optional";

export default async function fetchLocation(
  latitude: string,
  longitude: string
): Promise<Optional<LocationData>> {
  const res = await fetch(OpenWeatherMapRoute(latitude, longitude));

  if (!res.ok) return makeFailed("Could not determine location");

  const data: OpenWeatherMapResponse = await res.json();

  const { name } = data;
  const { sunset, sunrise } = data.sys;
  const time = getTimeOfDay(new Date(sunrise), new Date(sunset));

  return makeSuccessful({ name, time });
}
