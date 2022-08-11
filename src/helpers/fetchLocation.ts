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
  const res = await fetch(netlify("location", latitude, longitude));

  if (!res.ok) return makeFailed("Could not determine location");

  const data: LocationResponse = await res.json();

  const { name, state, country } = data[0];

  return makeSuccessful({ name, state, country });
}
