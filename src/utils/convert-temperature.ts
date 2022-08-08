export default function convertTemperature(
  kelvin: Temperature,
  units: TemperatureUnit
) {
  switch (units) {
    case "C":
      return kelvin ? Math.floor(kelvin - 273.15) : kelvin;
    case "F":
      return kelvin ? Math.floor((kelvin * 9) / 5 - 459.67) : kelvin;
  }
}
