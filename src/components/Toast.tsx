import { useEffect } from "react";
import type { IToastProps } from "../types/types";
import styles from "../styles/modules/Toast.module.css";

const Toast = ({
  message,
  type = "success",
  onClose,
  duration = 3000,
}: IToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <span>{message}</span>
      <button className={styles.close} onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default Toast;
