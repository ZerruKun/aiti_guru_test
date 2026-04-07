import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import SearchProduct from "../components/SearchProduct";
import ProductsList from "../components/ProductsList";
import ProductsCount from "../components/ProductsCount";
import styles from "../styles/modules/ProductsPage.module.css";

const PRODUCTS_PER_PAGE = 20;

const ProductsPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  // Пока хардкод.
  // const [totalPages, setTotalPages] = useState(1);

  // Проверка авторизации
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      navigate("/auth", { replace: true });
    }
  }, [navigate]);

  // Обновляем totalPages при загрузке данных (можно вынести в контекст)
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.general}>
      <SearchProduct />
      <AddProduct />

      <ProductsList page={currentPage} onPageChange={handlePageChange} />

      <ProductsCount
        total={194} // ← Пока моки, потом получать из useProducts
        skip={(currentPage - 1) * PRODUCTS_PER_PAGE}
        limit={PRODUCTS_PER_PAGE}
        currentPage={currentPage}
        totalPages={10} // ← 194 / 20 = ~10 страниц
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductsPage;
