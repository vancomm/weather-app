import { LocationData, LocationResponse } from "../types";

export default function parseLocationResponse(
  data: LocationResponse
): LocationData {
  const { name, state, country } = data[0];

  return { name, state, country };
}
