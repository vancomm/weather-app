const openWeatherRequestTypes = ["location", "weather", "forecast"] as const;

export type OpenWeatherRequestType = typeof openWeatherRequestTypes[number];
