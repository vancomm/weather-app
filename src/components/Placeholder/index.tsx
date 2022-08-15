import cn from "classnames";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./Placeholder.module.css";

interface PlaceholderProps {
  width: number | string;
  height: number | string;
}

export default function Placeholder({ width, height }: PlaceholderProps) {
  const {
    theme: { timeOfDay },
  } = useTheme();

  return (
    <div
      className={styles.placeholder}
      style={
        { "--ph-width": width, "--ph-height": height } as React.CSSProperties
      }
    >
      <div
        className={cn(styles.bgAnimation, {
          [styles.night]: timeOfDay === "night",
        })}
      ></div>
    </div>
  );
}
