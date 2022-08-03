const conversionMap: Record<
  TemperatureUnit,
  Record<TemperatureUnit, (t: Temperature) => Temperature>
> = {
  C: {
    C: (tc) => tc,
    F: (tc) => (tc ? tc * 1.8 + 32 : tc),
    K: (tc) => (tc ? tc + 237.15 : tc),
  },
  F: {
    C: (tf) => (tf ? (tf - 32) / 1.8 : tf),
    F: (tf) => tf,
    K: (tf) => (tf ? ((tf + 459.67) * 5) / 9 : null),
  },
  K: {
    C: (tk) => (tk ? tk - 273.15 : tk),
    F: (tk) => (tk ? (tk * 9) / 5 - 459.67 : null),
    K: (tk) => tk,
  },
};

export default function convertTemp(
  value: Temperature,
  from: TemperatureUnit,
  to: TemperatureUnit
) {
  return conversionMap[from][to](value);
}
