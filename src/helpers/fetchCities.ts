import {
  makeSuccessful,
  makeFailed,
  Optional,
  CitiesErrorResponse,
  PopulatedPlacesResponse,
  PopulatedPlaceSummary,
} from "../types";
import { netlify } from "./routes";

export default async function fetchCities(
  prefix: string
): Promise<Optional<PopulatedPlaceSummary[]>> {
  if (prefix === "") return makeSuccessful([]);

  const res = await fetch(netlify.geoDb(prefix));

  if (!res.ok) {
    const { message }: CitiesErrorResponse = await res.json();
    return makeFailed(message);
  }

  const { data }: PopulatedPlacesResponse = await res.json();

  return makeSuccessful(data);
}
