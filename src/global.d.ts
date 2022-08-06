type Option<T> = T | null;

type Successful<T> = {
  success: true;
  value: T;
};

type Failed = {
  success: false;
  message: string;
};

type Optional<T> = Successful<T> | Failed;

type LocationData = {
  name: string;
  time: TimeOfDay;
};

type WeatherData = {
  temperature: Temperature;
  status: WeatherStatus;
  description: WeatherDesc;
  moonPhase: MoonPhase;
};

type Temperature = Option<number>;

type TemperatureUnit = "K" | "C" | "F";

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

type TimeOfDay = "day" | "night";

type WwoCode =
  | "113"
  | "116"
  | "119"
  | "122"
  | "143"
  | "176"
  | "179"
  | "182"
  | "185"
  | "200"
  | "227"
  | "230"
  | "248"
  | "260"
  | "263"
  | "266"
  | "281"
  | "284"
  | "293"
  | "296"
  | "299"
  | "302"
  | "305"
  | "308"
  | "311"
  | "314"
  | "317"
  | "320"
  | "323"
  | "326"
  | "329"
  | "332"
  | "335"
  | "338"
  | "350"
  | "353"
  | "356"
  | "359"
  | "362"
  | "365"
  | "368"
  | "371"
  | "374"
  | "377"
  | "386"
  | "389"
  | "392"
  | "395";

type WeatherDesc =
  | "Unknown"
  | "Cloudy"
  | "Fog"
  | "HeavyRain"
  | "HeavyShowers"
  | "HeavySnow"
  | "HeavySnowShowers"
  | "LightRain"
  | "LightShowers"
  | "LightSleet"
  | "LightSleetShowers"
  | "LightSnow"
  | "LightSnowShowers"
  | "PartlyCloudy"
  | "Sunny"
  | "ThunderyHeavyRain"
  | "ThunderyShowers"
  | "ThunderySnowShowers"
  | "VeryCloudy";

type MoonPhase =
  | "New Moon"
  | "Waxing Crescent"
  | "First Quarter"
  | "Waxing Gibbous"
  | "Full Moon"
  | "Waning Gibbous"
  | "Last Quarter"
  | "Waning Crescent";

type Favicon =
  | "Cloud.ico"
  | "Cloud with Lightning and Rain.ico"
  | "Cloud with Lightning.ico"
  | "Cloud with Rain.ico"
  | "Cloud with Snow.ico"
  | "Fog.ico"
  | "Snowflake.ico"
  | "Sun Behind Cloud.ico"
  | "Sun Behind Large Cloud.ico"
  | "Sun Behind Rain Cloud.ico"
  | "Sun Behind Small Cloud.ico"
  | "Sun.ico"
  | "Umbrella.ico"
  | "Umbrella with Rain Drops.ico"
  | "New Moon.ico"
  | "Waxing Crescent Moon.ico"
  | "First Quarter Moon.ico"
  | "Waxing Gibbous Moon.ico"
  | "Full Moon.ico"
  | "Waning Gibbous Moon.ico"
  | "Last Quarter Moon.ico"
  | "Waning Crescent Moon.ico";
