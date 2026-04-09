import type { ISortField, IProductsHeaderProps } from "../types/types";
import styles from "../styles/modules/ProductsList.module.css";

const ProductsHeader = ({
  sortField,
  sortOrder,
  onSort,
}: IProductsHeaderProps) => {
  const getSortIcon = (field: ISortField) => {
    if (sortField !== field) return "↕"; // Нет сортировки
    if (sortOrder === "asc") return "↑"; // По возрастанию
    if (sortOrder === "desc") return "↓"; // По убыванию
    return "↕";
  };

  const handleSort = (field: ISortField) => {
    onSort(field);
  };

  return (
    <div className={styles.general}>
      <span className={styles.headerName}>Наименование</span>
      <span className={styles.headerVendor}>Вендор</span>
      <span className={styles.headerArticle}>Артикул</span>

      {/*Сортируемый заголовок: Оценка */}
      <span
        className={`${styles.headerRating} ${sortField === "rating" ? styles.sorted : ""}`}
        onClick={() => handleSort("rating")}
        style={{ cursor: "pointer" }}
        title="Сортировать по оценке"
      >
        Оценка {getSortIcon("rating")}
      </span>

      {/*Сортируемый заголовок: Цена */}
      <span
        className={`${styles.headerPrice} ${sortField === "price" ? styles.sorted : ""}`}
        onClick={() => handleSort("price")}
        style={{ cursor: "pointer" }}
        title="Сортировать по цене"
      >
        Цена, ₽ {getSortIcon("price")}
      </span>

      <span></span>
    </div>
  );
};

export default ProductsHeader;
