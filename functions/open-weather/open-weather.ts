import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const requestTypes = ["location", "weather", "forecast"] as const;

type RequestType = typeof requestTypes[number];

const requestTypesString: string = requestTypes.reduce((acc, curr, i) => {
  if (i === 0) return `'${curr}`;
  if (i < requestTypes.length - 1) return `${acc}, '${curr}'`;
  return `${acc} or '${curr}'`;
}, "");

function isRequestType(value: string): value is RequestType {
  return requestTypes.includes(value as RequestType);
}

const apiKey = process.env.OPENWEATHER_API_KEY;

export const routes: Readonly<Record<RequestType, Function>> = {
  location: (lat: string, lon: string, limit = 5) =>
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}`,
  weather: (lat: string, lon: string) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
  forecast: (lat: string, lon: string) =>
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`,
};

export const handler: Handler = async (event, context) => {
  const lat = event.queryStringParameters?.lat;
  const lon = event.queryStringParameters?.lon;
  const requestType = event.queryStringParameters?.type;

  if (!lat || !lon || !requestType) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: "Request must include 'type', 'lat' and 'lon' parameters",
      }),
    };
  }

  if (!isRequestType(requestType)) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: `Request parameter 'type' must be one of the following: ${requestTypesString}`,
      }),
    };
  }

  const res = await fetch(routes[requestType](lat, lon));

  if (!res.ok) {
    const text = await res.text();
    return {
      statusCode: res.status,
      body: text,
    };
  }

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
