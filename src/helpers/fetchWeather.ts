import { wttrInRoute } from "../routes";
import { WttrInResponse } from "./WttrInResponse";

const codeToDesc: Record<WwoCode, WeatherDesc> = {
  "113": "Sunny",
  "116": "PartlyCloudy",
  "119": "Cloudy",
  "122": "VeryCloudy",
  "143": "Fog",
  "176": "LightShowers",
  "179": "LightSleetShowers",
  "182": "LightSleet",
  "185": "LightSleet",
  "200": "ThunderyShowers",
  "227": "LightSnow",
  "230": "HeavySnow",
  "248": "Fog",
  "260": "Fog",
  "263": "LightShowers",
  "266": "LightRain",
  "281": "LightSleet",
  "284": "LightSleet",
  "293": "LightRain",
  "296": "LightRain",
  "299": "HeavyShowers",
  "302": "HeavyRain",
  "305": "HeavyShowers",
  "308": "HeavyRain",
  "311": "LightSleet",
  "314": "LightSleet",
  "317": "LightSleet",
  "320": "LightSnow",
  "323": "LightSnowShowers",
  "326": "LightSnowShowers",
  "329": "HeavySnow",
  "332": "HeavySnow",
  "335": "HeavySnowShowers",
  "338": "HeavySnow",
  "350": "LightSleet",
  "353": "LightShowers",
  "356": "HeavyShowers",
  "359": "HeavyRain",
  "362": "LightSleetShowers",
  "365": "LightSleetShowers",
  "368": "LightSnowShowers",
  "371": "HeavySnowShowers",
  "374": "LightSleetShowers",
  "377": "LightSleet",
  "386": "ThunderyShowers",
  "389": "ThunderyHeavyRain",
  "392": "ThunderySnowShowers",
  "395": "HeavySnowShowers",
};

const descToStatus: Record<WeatherDesc, WeatherStatus> = {
  Unknown: "unknown",
  Cloudy: "cloudy",
  Fog: "fog",
  HeavyRain: "rain",
  HeavyShowers: "rain",
  HeavySnow: "snow",
  HeavySnowShowers: "snow",
  LightRain: "chancerain",
  LightShowers: "chancerain",
  LightSleet: "chancesleet",
  LightSleetShowers: "chancesleet",
  LightSnow: "chancesnow",
  LightSnowShowers: "chancesnow",
  PartlyCloudy: "partlycloudy",
  Sunny: "sunny",
  ThunderyHeavyRain: "tstorms",
  ThunderyShowers: "tstorms",
  ThunderySnowShowers: "tstorms",
  VeryCloudy: "cloudy",
};

function codeToStatus(code: WwoCode): WeatherStatus {
  return descToStatus[codeToDesc[code]];
}

export default async function fetchWeather(
  lat: string,
  lon: string
): Promise<Option<[Temperature, WeatherStatus, string, string]>> {
  const res = await fetch(wttrInRoute(lat, lon));

  console.log(res);
  if (!res.ok) return null;

  const data: WttrInResponse = await res.json();
  console.log(data);

  const { temp_C, weatherCode } = data.current_condition[0];
  const description = data.current_condition[0].weatherDesc[0].value;
  const region = data.nearest_area[0].region[0].value;
  const country = data.nearest_area[0].country[0].value;

  const temperature = parseInt(temp_C) as Temperature;
  const status = codeToStatus(weatherCode);
  const location = `${region}, ${country}`;

  return [temperature, status, description, location];
}
