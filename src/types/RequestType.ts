const requestTypes = ["location", "weather", "forecast"] as const;

export type RequestType = typeof requestTypes[number];
