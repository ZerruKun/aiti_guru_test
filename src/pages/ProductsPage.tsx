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
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) navigate("/auth", { replace: true });
  }, [navigate]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTotalChange = (newTotal: number) => {
    setTotal(newTotal);
  };

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);

  return (
    <div className={styles.general}>
      <SearchProduct />
      <AddProduct />

      <ProductsList page={currentPage} onTotalChange={handleTotalChange} />

      <ProductsCount
        total={total}
        skip={(currentPage - 1) * PRODUCTS_PER_PAGE}
        limit={PRODUCTS_PER_PAGE}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductsPage;
