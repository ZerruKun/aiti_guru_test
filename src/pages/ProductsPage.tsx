import AddProduct from "../components/AddProduct";
import SearchProduct from "../components/SearchProduct";
import ProductsList from "../components/ProductsList";
import ProductsCount from "../components/ProductsCount";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      navigate("/auth", { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      <SearchProduct />
      <AddProduct />
      <ProductsList />
      <ProductsCount />
    </div>
  );
};

export default ProductsPage;
