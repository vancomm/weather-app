export interface LocationData {
  name: string;
  state: string;
  country: string;
}

export function locationToString(location: LocationData): string {
  const { name, state, country } = location;
  const unique = new Set([name, state, country]);
  return [...unique.values()].join(", ");
}

export const defaultLocationData: LocationData = {
  name: "",
  state: "",
  country: "",
};
