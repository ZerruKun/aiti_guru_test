import styles from "../styles/modules/ProgressBar.module.css";

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
}

const ProgressBar = ({ progress, label = "Загрузка..." }: ProgressBarProps) => {
  const safeProgress = Math.max(0, Math.min(100, progress));
  const filledSegments = Math.floor(safeProgress / 10);

  return (
    <div className={styles.general}>
      <div className={styles.bar}>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className={`${styles.segment} ${index < filledSegments ? styles.filled : ""}`}
          />
        ))}
      </div>
      <div className={styles.label}>
        {label} {safeProgress}%
      </div>
    </div>
  );
};

export default ProgressBar;
