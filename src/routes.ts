export const wttrInRoute = (lat: string, lon: string) =>
  `https://wttr.in/${lat},${lon}?format=j1`;

export const altWttrInRoute = (location: string) =>
  `https://wttr.in/${location}?format=j1`;

const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

export const OpenWeatherMapRoute = (lat: string, lon: string) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
