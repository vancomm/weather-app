import cn from "classnames";
import { useTheme } from "../../contexts/ThemeContext";
import { ReactComponent as Reload } from "../../assets/icons/reload.svg";
import styles from "./ReloadButton.module.css";

export default function ReloadButton() {
  const { theme } = useTheme();

  return (
    <button className={styles.reloadBtn}>
      <Reload
        className={cn(styles.reloadIcon, {
          [styles.night]: theme.timeOfDay === "night",
        })}
      />
    </button>
  );
}
