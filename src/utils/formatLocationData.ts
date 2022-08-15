import { Maybe, LocationData } from "../types";

export default function formatLocationData(
  location: Maybe<LocationData>,
  def = "--"
): string {
  return location?.name || def;
  // const { name, state, country } = location;
  // const unique = new Set([name, state, country]);
  // const str = [...unique.values()].join(", ");
  // return str || "-";
}
