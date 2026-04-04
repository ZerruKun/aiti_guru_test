import ProductItem from "./ProductItem";
import styles from "../styles/modules/ProductsList.module.css";

const ProductsList = () => {
  return (
    <div>
      <div className={styles.general}>
        <span>Наименование</span>
        <span>Вендор</span>
        <span>Артикул</span>
        <span>Оценка</span>
        <span>Цена, ₽</span>
        <span></span>
      </div>
      <div>
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </div>
  );
};

export default ProductsList;
