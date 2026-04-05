import AddProduct from "../components/AddProduct";
import SearchProduct from "../components/SearchProduct";
import ProductsList from "../components/ProductsList";
import ProductsCount from "../components/ProductsCount";

const ProductsPage = () => {
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
