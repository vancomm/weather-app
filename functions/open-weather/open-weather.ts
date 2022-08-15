import { Handler } from "@netlify/functions";
import fetch from "node-fetch";
import { makeFailed, makeSuccessful } from "./utils/Optional";

const apiKey = process.env.OPENWEATHER_API_KEY;

type WeatherRoute = (lat: string, lon: string) => string;

const routes: Readonly<Record<string, WeatherRoute>> = {
  location: (lat: string, lon: string, limit = 1) =>
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}`,
  current: (lat: string, lon: string) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
  forecast: (lat: string, lon: string) =>
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`,
};

export const handler: Handler = async (event, context) => {
  const lat = event.queryStringParameters?.lat;
  const lon = event.queryStringParameters?.lon;

  if (!lat || !lon) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: "Request must include 'lat' and 'lon' parameters",
      }),
    };
  }

  const response = await Promise.all(
    Object.entries(routes).map(([key, route]) =>
      fetch(route(lat, lon))
        .then(async (res) => {
          if (!res.ok) return makeFailed(`Could not fetch ${key}`);
          const value = await res.json();
          return makeSuccessful(value);
        })
        .then((option) => ({ [key]: option }))
    )
  )
    .then((optionObjs) => Object.assign({}, ...optionObjs))
    .then((value) => ({
      statusCode: 200,
      body: JSON.stringify(value),
    }))
    .catch((err) => ({
      statusCode: 500,
      body: err.message ?? "Internal error",
    }));

  return response;
};
