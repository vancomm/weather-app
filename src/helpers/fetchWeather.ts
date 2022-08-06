import { altWttrInRoute } from "../routes";
import { WttrInResponse } from "./WttrInResponse";
import { descToStatus, codeToDesc } from "../utils/maps";
import getTimeOfDay from "../utils/get-time-of-day";

function codeToStatus(code: WwoCode): WeatherStatus {
  return descToStatus[codeToDesc[code]];
}

export default async function fetchWeather({
  location,
  sunrise,
  sunset,
}: {
  location: string;
  sunrise: Date;
  sunset: Date;
}): Promise<
  Option<[Temperature, Time, WeatherStatus, string, string, MoonPhase]>
> {
  const res = await fetch(altWttrInRoute(location));

  if (!res.ok) return null;

  const data: WttrInResponse = await res.json();

  // console.log(data);

  const { temp_C, weatherCode } = data.current_condition[0];
  const description = data.current_condition[0].weatherDesc[0].value;
  // const area = data.nearest_area[0].areaName[0].value;
  // const region = data.nearest_area[0].region[0].value;
  // const country = data.nearest_area[0].country[0].value;
  const moon = data.weather[0].astronomy[0].moon_phase;

  const temperature = parseInt(temp_C) as Temperature;
  const status = codeToStatus(weatherCode);
  // const location = [area, region, country]
  // const location = [region, country].filter((i) => i.length > 0).join(", ");

  const time = getTimeOfDay(sunrise, sunset);

  return [temperature, time, status, description, location, moon];
}

// export default async function fetchWeather(
//   lat: string,
//   lon: string
// ): Promise<
//   Option<[Temperature, Time, WeatherStatus, string, string, MoonPhase]>
// > {
//   console.log({ lat, lon });
//   const res = await fetch(wttrInRoute(lat, lon));

//   const data: WttrInResponse = await res.json();

//   console.log(data);
//   // if (!res.ok) return null;

//   const { temp_C, weatherCode } = data.current_condition[0];
//   const description = data.current_condition[0].weatherDesc[0].value;
//   // const area = data.nearest_area[0].areaName[0].value;
//   const region = data.nearest_area[0].region[0].value;
//   const country = data.nearest_area[0].country[0].value;
//   const moon = data.weather[0].astronomy[0].moon_phase;

//   const temperature = parseInt(temp_C) as Temperature;
//   const status = codeToStatus(weatherCode);
//   // const location = [area, region, country]
//   const location = [region, country].filter((i) => i.length > 0).join(", ");

//   const { sunrise, sunset } = SunCalc.getTimes(
//     new Date(),
//     parseFloat(lat),
//     parseFloat(lon)
//   );

//   const time = getTimeOfDay(sunrise, sunset);

//   return [temperature, time, status, description, location, moon];
// }
