export default function formatTemperature(
  kelvin: Temperature,
  units: TemperatureUnit
) {
  switch (units) {
    case "C":
      return kelvin !== null ? Math.round(kelvin - 273.15).toString() : "--";
    case "F":
      return kelvin !== null
        ? Math.round((kelvin * 9) / 5 - 459.67).toString()
        : "--";
  }
}
