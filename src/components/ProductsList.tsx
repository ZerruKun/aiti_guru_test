import { useEffect } from "react";
import ProductItem from "./ProductItem";
import { useProducts } from "../hooks/useProducts";
import type { IProductsListProps } from "../types/types";
import styles from "../styles/modules/ProductsList.module.css";

const ProductsList = ({ page, onTotalChange }: IProductsListProps) => {
  const { products, total, loading, error } = useProducts(page);

  useEffect(() => {
    if (onTotalChange && total > 0) {
      onTotalChange(total);
    }
  }, [total, onTotalChange]);

  if (loading) return <div className={styles.loading}>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка: {error}</div>;

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
