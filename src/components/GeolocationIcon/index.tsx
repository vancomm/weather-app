import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";
import { BaseIconProps } from "../../types";
import styles from "./GeolocationIcon.module.css";

export default function GeolocationIcon({ width, height }: BaseIconProps) {
  return <Arrow className={styles.geoIcon} width={width} height={height} />;
}
