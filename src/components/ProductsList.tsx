import ProductItem from "./ProductItem";
import { useProducts } from "../hooks/useProducts";
import type { IProductsListProps } from "../types/types";
import styles from "../styles/modules/ProductsList.module.css";

const ProductsList = ({ page, onPageChange }: IProductsListProps) => {
  const { products, total, limit, loading, error } = useProducts(page);

  if (loading) {
    return <div className={styles.loading}>Загрузка товаров...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  return (
    <div>
      {/* Заголовки таблицы */}
      <div className={styles.general}>
        <span>Наименование</span>
        <span>Вендор</span>
        <span>Артикул</span>
        <span>Оценка</span>
        <span>Цена, ₽</span>
        <span></span>
      </div>

      {/* Список товаров */}
      <div>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
