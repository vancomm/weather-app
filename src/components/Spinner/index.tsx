import { TailSpin } from "react-loader-spinner";
import styles from "./Spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.spinner}>
      <TailSpin color="#ffffff" />
    </div>
  );
}
