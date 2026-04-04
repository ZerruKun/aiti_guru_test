import styles from "../styles/modules/AddProduct.module.css";

const AddProduct = () => {
  return (
    <div className={styles.general}>
      <span className={styles.allPositions}>Все позиции</span>
      <div className={styles.buttons}>
        <button className={styles.refreshButton}></button>
        <button className={styles.addButton}>Добавить</button>
      </div>
    </div>
  );
};

export default AddProduct;
