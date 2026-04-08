import { useEffect } from "react";
import ProductItem from "./ProductItem";
import type { IProductsListProps, IProduct } from "../types/types";
import styles from "../styles/modules/ProductsList.module.css";

const ProductsList = ({
  page,
  products,
  onTotalChange,
}: IProductsListProps) => {
  useEffect(() => {
    if (onTotalChange) {
      onTotalChange(products.length);
    }
  }, [products.length, onTotalChange]);

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
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
