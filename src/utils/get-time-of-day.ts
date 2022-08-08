import SunCalc from "suncalc";

export default function getTimeOfDay(
  latitude: number,
  longitude: number
): TimeOfDay {
  const { sunrise, sunset } = SunCalc.getTimes(new Date(), latitude, longitude);
  const now = new Date();

  if (sunset > sunrise) {
    return now > sunrise && now < sunset ? "day" : "night";
  }
  return now > sunset && now < sunrise ? "night" : "day";
}
