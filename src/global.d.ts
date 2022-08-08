type Option<T> = T | null;

type Temperature = Option<number>;

type TemperatureUnit = "C" | "F";

type TimeOfDay = "day" | "night";

type WeatherStatus =
  | "chanceflurries"
  | "chancerain"
  | "chancesleet"
  | "chancesnow"
  | "chancetstorms"
  | "clear"
  | "cloudy"
  | "flurries"
  | "fog"
  | "hazy"
  | "mostlycloudy"
  | "mostlysunny"
  | "partlycloudy"
  | "partlysunny"
  | "rain"
  | "sleet"
  | "snow"
  | "sunny"
  | "tstorms"
  | "unknown";

type MoonPhase =
  | "New"
  | "Waxing Crescent"
  | "First Quarter"
  | "Waxing Gibbous"
  | "Full"
  | "Waning Gibbous"
  | "Last Quarter"
  | "Waning Crescent";

type Favicon =
  | "Cloud.png"
  | "Cloud with Lightning and Rain.png"
  | "Cloud with Lightning.png"
  | "Cloud with Rain.png"
  | "Cloud with Snow.png"
  | "Fog.png"
  | "Snowflake.png"
  | "Sun Behind Cloud.png"
  | "Sun Behind Large Cloud.png"
  | "Sun Behind Rain Cloud.png"
  | "Sun Behind Small Cloud.png"
  | "Sun.png"
  | "Umbrella.png"
  | "Umbrella with Rain Drops.png"
  | "New Moon.png"
  | "Waxing Crescent Moon.png"
  | "First Quarter Moon.png"
  | "Waxing Gibbous Moon.png"
  | "Full Moon.png"
  | "Waning Gibbous Moon.png"
  | "Last Quarter Moon.png"
  | "Waning Crescent Moon.png";

type WeatherIconId =
  | "01d"
  | "01d"
  | "01n"
  | "02d"
  | "02n"
  | "03d"
  | "03n"
  | "04d"
  | "04n"
  | "09d"
  | "09n"
  | "10d"
  | "10n"
  | "11d"
  | "11n"
  | "13d"
  | "13n"
  | "50d"
  | "50n"
  | "unknown";
