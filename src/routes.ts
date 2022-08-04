const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

export const weatherRoute = (latitude: string, longitude: string) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`;

export const wttrInRoute = (lat: string, lon: string) =>
  `https://wttr.in/${lat},${lon}?format=j1`;
