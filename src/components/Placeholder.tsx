import React from "react";
import "../assets/styles/placeholder.css";

interface PlaceholderProps {
  width: number | string;
  height: number | string;
}

export default function Placeholder({ width, height }: PlaceholderProps) {
  return (
    <div
      className="placeholder"
      style={
        { "--ph-width": width, "--ph-height": height } as React.CSSProperties
      }
    >
      <div className="bg-animation"></div>
    </div>
  );
}
