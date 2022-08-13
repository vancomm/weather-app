import { ReactSVG } from "react-svg";

export interface BaseIconProps {
  width: string;
  height: string;
}

interface IconProps extends BaseIconProps {
  source: string;
  customStyle?: string;
}

export default function Icon({
  width,
  height,
  source,
  customStyle: style,
}: IconProps) {
  return (
    <ReactSVG
      beforeInjection={(svg) => {
        svg.setAttribute(
          "style",
          `width: ${width}; height: ${height}; ${style}`
        );
      }}
      src={source}
    />
  );
}
