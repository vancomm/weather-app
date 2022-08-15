export const netlify = {
  openWeather: (lat: number, lon: number) =>
    `/.netlify/functions/open-weather/?lat=${lat}&lon=${lon}`,
  geoDb: (prefix: string) => `/.netlify/functions/geo-db?prefix=${prefix}`,
};
