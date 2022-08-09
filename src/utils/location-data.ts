export interface LocationData {
  name: string;
  state: string;
  country: string;
}

export function formatLocationData(location: LocationData): string {
  const { name, state, country } = location;
  const unique = new Set([name, state, country]);
  const str = [...unique.values()].join(", ");
  return str || "-";
}

export const defaultLocationData: LocationData = {
  name: "",
  state: "",
  country: "",
};
