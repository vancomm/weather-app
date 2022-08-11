import { Handler } from "@netlify/functions";
import fetch from "node-fetch";
import { GeoDbErrorResponse } from "./types";

const rapidApiHost = process.env.GEODB_RAPIDAPI_HOST;
const rapidApiKey = process.env.GEODB_RAPIDAPI_KEY;

export const handler: Handler = async (event, context) => {
  const prefix = event.queryStringParameters?.prefix;

  if (!prefix) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: "Request must include 'prefix' parameter",
      }),
    };
  }

  if (!rapidApiHost || !rapidApiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Cannot access API",
      }),
    };
  }

  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${prefix}&sort=-population&types=CITY`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host": rapidApiHost,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    const data = await res.json();
    const { errors } = data as GeoDbErrorResponse;
    const errorString: string =
      errors?.map(({ message }) => message).join("; ") ?? "";
    return {
      statusCode: res.status,
      body: JSON.stringify({
        message: errorString,
      }),
    };
  }

  const data = await res.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
