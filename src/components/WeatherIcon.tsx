import cn from "classnames";

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

type Time = "day" | "night";

const iconIdMap: Record<WeatherIconId, [Time, WeatherStatus]> = {
  "01d": ["day", "sunny"],
  "02d": ["day", "mostlysunny"],
  "03d": ["day", "mostlycloudy"],
  "04d": ["day", "cloudy"],
  "09d": ["day", "rain"],
  "10d": ["day", "rain"],
  "11d": ["day", "tstorms"],
  "13d": ["day", "snow"],
  "50d": ["day", "hazy"],
  "01n": ["night", "sunny"],
  "02n": ["night", "mostlysunny"],
  "03n": ["night", "mostlycloudy"],
  "04n": ["night", "cloudy"],
  "09n": ["night", "rain"],
  "10n": ["night", "rain"],
  "11n": ["night", "tstorms"],
  "13n": ["night", "snow"],
  "50n": ["night", "hazy"],
  unknown: ["day", "unknown"],
};

interface WeatherIconProps {
  variant: "black" | "white" | "solid-black" | "solid-white";
  size: "16" | "32" | "64" | "128" | "256";
  weatherIconId: WeatherIconId;
}

export default function WeatherIcon({
  variant,
  size,
  weatherIconId,
}: WeatherIconProps) {
  const [time, status] = iconIdMap[weatherIconId];
  return (
    <i
      className={cn("wu", `wu-${variant}`, `wu-${status}`, `wu-${size}`, {
        "wu-night": time === "night",
      })}
    ></i>
  );
}
