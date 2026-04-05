import styles from "../styles/modules/ProductsCount.module.css";

const ProductsCount = () => {
  // Моки
  const fromProduct = 1;
  const toProduct = 20;
  const totalProducts = 120;

  return (
    <div className={styles.general}>
      <div className={styles.shown}>
        <span className={styles.pagination}>
          Показано{" "}
          <span className={styles.value}>
            {fromProduct}-{toProduct}
          </span>{" "}
          из <span className={styles.value}>{totalProducts}</span>
        </span>
      </div>
      <div className={styles.pages}>
        <button className={styles.left}></button>
        <button className={styles.pageNumber}>1</button>
        <button className={styles.pageNumberSelected}>2</button>
        <button className={styles.right}></button>
      </div>
    </div>
  );
};

export default ProductsCount;
