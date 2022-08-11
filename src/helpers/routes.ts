const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

export const openWeather = {
  locationRoute: (lat: number, lon: number, limit = 5) =>
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}`,
  weatherRoute: (lat: number, lon: number) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
  forecastRoute: (lat: number, lon: number) =>
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`,
};

export const netlify = {
  weather: (lat: number, lon: number) =>
    `/.netlify/functions/weather?lat=${lat}&lon=${lon}`,
};
