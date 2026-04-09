import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import ProductsPage from "./pages/ProductsPage";

const App = () => {
  useLocation();

  // Да, при каждом рендере, но это "недорого"
  const isAuth = () => {
    return !!(localStorage.getItem("token") || sessionStorage.getItem("token"));
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route
        path="/auth"
        element={isAuth() ? <Navigate to="/products" /> : <AuthPage />}
      />
      <Route
        path="/products"
        element={isAuth() ? <ProductsPage /> : <Navigate to="/auth" />}
      />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};

export default App;
