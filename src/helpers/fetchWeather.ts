import SunCalc from "suncalc";
import { wttrInRoute } from "../routes";
import { WttrInResponse } from "./WttrInResponse";
import { descToStatus, codeToDesc } from "../utils/maps";

function codeToStatus(code: WwoCode): WeatherStatus {
  return descToStatus[codeToDesc[code]];
}

function getTimeOfDay(sunrise: Date, sunset: Date): Time {
  const now = new Date();
  if (sunset > sunrise) {
    return now > sunrise && now < sunset ? "day" : "night";
  }
  return now > sunset && now < sunrise ? "night" : "day";
}

export default async function fetchWeather(
  lat: string,
  lon: string
): Promise<
  Option<[Temperature, Time, WeatherStatus, string, string, MoonPhase]>
> {
  const res = await fetch(wttrInRoute(lat, lon));

  if (!res.ok) return null;

  const data: WttrInResponse = await res.json();

  const { temp_C, weatherCode } = data.current_condition[0];
  const description = data.current_condition[0].weatherDesc[0].value;
  const area = data.nearest_area[0].areaName[0].value;
  const region = data.nearest_area[0].region[0].value;
  const country = data.nearest_area[0].country[0].value;
  const moon = data.weather[0].astronomy[0].moon_phase;

  const temperature = parseInt(temp_C) as Temperature;
  const status = codeToStatus(weatherCode);
  const location = [area, region, country]
    .filter((i) => i.length > 0)
    .join(", ");

  const { sunrise, sunset } = SunCalc.getTimes(
    new Date(),
    parseFloat(lat),
    parseFloat(lon)
  );

  const time = getTimeOfDay(sunrise, sunset);

  return [temperature, time, status, description, location, moon];
}
