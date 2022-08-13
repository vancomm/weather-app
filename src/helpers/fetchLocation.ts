import { netlify } from "./routes";
import {
  Optional,
  makeFailed,
  makeSuccessful,
  LocationData,
  LocationResponse,
} from "../types";

export default async function fetchLocation(
  latitude: number,
  longitude: number
): Promise<Optional<LocationData>> {
  const res = await fetch(netlify.openWeather("location", latitude, longitude));

  if (!res.ok) return makeFailed("Could not determine location");

  try {
    const data: LocationResponse = await res.json();

    const { name, state, country } = data[0];

    return makeSuccessful({ name, state, country });
  } catch (e) {
    return makeFailed("Bad location data");
  }
}
