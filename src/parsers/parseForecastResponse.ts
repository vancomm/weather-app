import { ForecastData, ForecastResponse } from "../types";
import { iconIdToTimeAndStatus, statusPriority } from "../utils/constants";

export default function parseForecastResponse(
  data: ForecastResponse
): ForecastData {
  const { list } = data;

  return [...Array(data.cnt / 8).keys()].map((i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    const dayData = list.filter((i) => {
      const dt = new Date(i.dt * 1000);
      return dt.getDate() === date.getDate();
    });
    const pop = dayData.map((i) => i.pop).sort((a, b) => b - a)[0];
    const tempMin = dayData.map((i) => i.main.temp).sort((a, b) => a - b)[0];
    const tempMax = dayData.map((i) => i.main.temp).sort((a, b) => b - a)[0];
    const status = dayData
      .map((i) => {
        const { icon } = i.weather[0];
        const [, status] = iconIdToTimeAndStatus[icon];
        return status;
      })
      .sort((a, b) => statusPriority[a] - statusPriority[b])[0];
    return { date, tempMin, tempMax, status, pop };
  });
}
