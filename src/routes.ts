const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

const weatherRoute = (latitude: string, longitude: string) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`;

export default weatherRoute;
