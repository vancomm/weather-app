import { openWeather } from "./routes";
import { ForecastResponse } from "./ForecastResponse";
import { ForecastData } from "../utils/forecast-data";
import { iconIdMap, statusPriority } from "../utils/maps";
import { makeFailed, makeSuccessful, Optional } from "../utils/optional";

export default async function fetchForecast(
  latitude: number,
  longitude: number
): Promise<Optional<ForecastData[]>> {
  const res = await fetch(openWeather.forecastRoute(latitude, longitude));

  if (!res.ok) return makeFailed("Could not fetch forecast");

  const data: ForecastResponse = await res.json();

  const { list } = data;

  const value = [...Array(data.cnt / 8 + 1).keys()].map((i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dayData = list.filter((i) => {
      const dt = new Date(i.dt * 1000);
      return dt.getDate() === date.getDate();
    });
    console.log(dayData);
    const pop = dayData.map((i) => i.pop).sort((a, b) => b - a)[0];
    const tempMin = dayData.map((i) => i.main.temp).sort((a, b) => a - b)[0];
    const tempMax = dayData.map((i) => i.main.temp).sort((a, b) => b - a)[0];
    const status = dayData
      .map((i) => {
        const { icon } = i.weather[0];
        const [, status] = iconIdMap[icon];
        return status;
      })
      .sort((a, b) => statusPriority[a] - statusPriority[b])[0];
    return { date, tempMin, tempMax, status, pop };
  });

  return makeSuccessful(value);
}
