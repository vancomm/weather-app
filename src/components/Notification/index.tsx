import cn from "classnames";
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./Notification.module.css";

interface NotificationProps {
  children: React.ReactNode;
}

export default function Notification({ children }: NotificationProps) {
  const { theme } = useTheme();

  const { timeOfDay } = theme;

  return (
    <div
      className={cn(styles.notification, {
        [styles.night]: timeOfDay === "night",
      })}
    >
      {children}
    </div>
  );
}
