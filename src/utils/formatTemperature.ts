import { TemperatureUnit } from "../types";

export default function formatTemperature(
  kelvin: number,
  units: TemperatureUnit
) {
  // if (kelvin === undefined) return "--";
  switch (units) {
    case "C":
      return Math.round(kelvin - 273.15).toString();
    case "F":
      return Math.round((kelvin * 9) / 5 - 459.67).toString();
  }
}
