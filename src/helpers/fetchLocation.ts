import { openWeather } from "./routes";
import { Optional, makeFailed, makeSuccessful } from "../utils/optional";
import { LocationData } from "../utils/location-data";
import { LocationResponse } from "./LocationResponse";

export default async function fetchLocation(
  latitude: number,
  longitude: number
): Promise<Optional<LocationData>> {
  const res = await fetch(openWeather.locationRoute(latitude, longitude));

  if (!res.ok) return makeFailed("Could not determine location");

  const data: LocationResponse = await res.json();

  const { name, state, country } = data[0];

  return makeSuccessful({ name, state, country });
}
