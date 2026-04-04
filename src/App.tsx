import AddProduct from "./components/AddProduct";
import SearchProduct from "./components/SearchProduct";
import ProductsPage from "./pages/ProductsPage";

const App = () => {
  return (
    <div>
      <SearchProduct />
      <AddProduct />
      <ProductsPage />
    </div>
  );
};

export default App;
