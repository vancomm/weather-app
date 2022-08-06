import { altWttrInRoute } from "../routes";
import { WttrInResponse } from "./WttrInResponse";
import { descToStatus, codeToDesc } from "../utils/maps";
import { makeFailed, makeSuccessful, isSuccessful } from "../utils/optional";

function codeToStatus(code: WwoCode): WeatherStatus {
  return descToStatus[codeToDesc[code]];
}

export default async function fetchWeather(
  option: Optional<{ name: string }>
): Promise<Optional<WeatherData>> {
  if (!isSuccessful(option)) return option;
  const { name } = option.value;
  const res = await fetch(altWttrInRoute(name));

  console.log(res);

  if (!res.ok) return makeFailed("Could not fetch weather data");

  try {
    const data: WttrInResponse = await res.json();

    const { temp_C, weatherCode } = data.current_condition[0];
    const description = data.current_condition[0].weatherDesc[0].value;
    const moonPhase = data.weather[0].astronomy[0].moon_phase;

    const temperature = parseInt(temp_C) as Temperature;
    const status = codeToStatus(weatherCode);

    return makeSuccessful({ temperature, status, description, moonPhase });
  } catch (e) {
    return makeFailed("Bad weather data");
  }
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
