import styles from "../styles/modules/Product.module.css";

const Product = () => {
  return (
    <div className={styles.general}>
      <div className={styles.product}>
        <label className={styles.checkbox} htmlFor="check">
          <input
            type="checkbox"
            id="check"
            name="check"
            className={styles.checkboxInput}
          />
          <span className={styles.checkboxCustom}></span>
        </label>
        <span className={styles.greySquare}></span>
        <div className={styles.commodity}>
          <span className={styles.name}>Название</span>
          <span className={styles.category}>Категория</span>
        </div>
      </div>
      <span className={styles.vendor}>Вендор</span>
      <span className={styles.article}>Артикул</span>
      <span className={styles.rating}>Оценка</span>
      <span className={styles.price}>Цена</span>
      <div className={styles.buttons}>
        <button className={styles.plusButton}>+</button>
        <button className={styles.dotesButton}>...</button>
      </div>
    </div>
  );
};

export default Product;
