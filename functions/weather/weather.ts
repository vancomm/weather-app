import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

export const handler: Handler = async (event, context) => {
  const lat = event.queryStringParameters?.lat;
  const lon = event.queryStringParameters?.lon;

  if (!lat || !lon)
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: "Request must include 'lat' and 'lon' parameters",
      }),
    };

  const apiKey = process.env.OPENWEATHER_API_KEY;

  const route = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  const res = await fetch(route);

  if (!res.ok) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Could not fetch weather",
      }),
    };
  }

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
