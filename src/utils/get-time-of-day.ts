export default function getTimeOfDay(sunrise: Date, sunset: Date): TimeOfDay {
  const now = new Date();
  if (sunset > sunrise) {
    return now > sunrise && now < sunset ? "day" : "night";
  }
  return now > sunset && now < sunrise ? "night" : "day";
}
