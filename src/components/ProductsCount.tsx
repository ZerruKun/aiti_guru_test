import type { IProductsCountProps } from "../types/types";
import styles from "../styles/modules/ProductsCount.module.css";

const ProductsCount = ({
  total,
  skip,
  limit,
  currentPage,
  totalPages,
  onPageChange,
}: IProductsCountProps) => {
  const fromProduct = skip + 1;
  const toProduct = Math.min(skip + limit, total);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxVisible = 5;
    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          className={
            i === currentPage ? styles.pageNumberSelected : styles.pageNumber
          }
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>,
      );
    }
    return buttons;
  };

  return (
    <div className={styles.general}>
      <div className={styles.shown}>
        <span className={styles.pagination}>
          Показано{" "}
          <span className={styles.value}>
            {fromProduct}-{toProduct}
          </span>{" "}
          из <span className={styles.value}>{total}</span>
        </span>
      </div>

      <div className={styles.pages}>
        <button
          className={styles.left}
          onClick={handlePrev}
          disabled={currentPage === 1}
        ></button>
        {totalPages > 0 && renderPageButtons()}{" "}
        <button
          className={styles.right}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        ></button>
      </div>
    </div>
  );
};

export default ProductsCount;
