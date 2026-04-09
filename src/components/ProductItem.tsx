import type { IProductItemProps } from "../types/types";
import styles from "../styles/modules/ProductItem.module.css";

const ProductItem = ({ product }: IProductItemProps) => {
  return (
    <div className={styles.general}>
      <div className={styles.product}>
        <label className={styles.checkbox} htmlFor={`check-${product.id}`}>
          <input
            type="checkbox"
            id={`check-${product.id}`}
            name="check"
            className={styles.checkboxInput}
          />
          <span className={styles.checkboxCustom}></span>
        </label>
        {product.thumbnail && (
          <img
            src={product.thumbnail}
            alt={product.name}
            className={styles.thumbnail}
          />
        )}
        {!product.thumbnail && <span className={styles.greySquare}></span>}

        <div className={styles.commodity}>
          <span className={styles.name}>{product.name}</span>
          <span className={styles.category}>{product.category}</span>
        </div>
      </div>

      <span className={styles.vendor}>{product.vendor}</span>
      <span className={styles.article}>{product.article}</span>
      <span className={styles.rating}>
        <span
          className={
            product.rating < 3.5 ? styles.lowRating : styles.normalRating
          }
        >
          {product.rating.toFixed(1)}
        </span>
        /5
      </span>
      <span className={styles.price}>
        {(() => {
          const [whole, decimal] = product.price.toFixed(2).split(".");
          return (
            <>
              {whole}
              <span className={styles.priceDecimal}>.{decimal}</span> ₽
            </>
          );
        })()}
      </span>

      <div className={styles.buttons}>
        <button className={styles.plusButton}>+</button>
        <button className={styles.dotesButton}>...</button>
      </div>
    </div>
  );
};

export default ProductItem;
