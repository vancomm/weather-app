import { Maybe, LocationData } from "../types";

export default function formatLocationData(
  location: Maybe<LocationData>
): string {
  if (!location) return "-";
  const { name } = location;
  return name || "-";
  // const { name, state, country } = location;
  // const unique = new Set([name, state, country]);
  // const str = [...unique.values()].join(", ");
  // return str || "-";
}
