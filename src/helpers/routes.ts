import { RequestType } from "../types";

export const netlify = (type: RequestType, lat: number, lon: number) =>
  `/.netlify/functions/open-weather/?type=${type}&lat=${lat}&lon=${lon}`;
