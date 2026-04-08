import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import SearchProduct from "../components/SearchProduct";
import ProductsList from "../components/ProductsList";
import ProductsCount from "../components/ProductsCount";
import Toast from "../components/Toast";
import styles from "../styles/modules/ProductsPage.module.css";
import type { IProduct } from "../types/types";

const PRODUCTS_PER_PAGE = 20;

const ProductsPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [localProducts, setLocalProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Проверка авторизации
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) navigate("/auth", { replace: true });
  }, [navigate]);

  // Получение товаров из API
  const loadProducts = () => {
    setLoading(true);

    fetch(`https://dummyjson.com/products?limit=200&skip=0`)
      .then((res) => res.json())
      .then((data) => {
        const transformed = data.products.map((api: any) => ({
          id: api.id,
          name: api.title,
          category: api.category,
          vendor: api.brand,
          article: api.sku,
          rating: api.rating,
          price: api.price,
          thumbnail: api.thumbnail,
        }));

        setAllProducts(transformed);
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRefresh = () => {
    setLocalProducts([]);
    loadProducts();
    setToast({ message: "Список товаров обновлён", type: "success" });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Обработчик добавления товара
  const handleAddProduct = (newProduct: {
    name: string;
    price: number;
    vendor: string;
    article: string;
    rating: number;
  }) => {
    const product: IProduct = {
      id: Date.now(),
      name: newProduct.name,
      category: "new",
      vendor: newProduct.vendor,
      article: newProduct.article,
      rating: newProduct.rating,
      price: newProduct.price,
      thumbnail: "",
    };
    setLocalProducts((prev) => [product, ...prev]);
    setToast({ message: "Товар успешно добавлен!", type: "success" });
  };

  // === ВЫЧИСЛЕНИЯ ДЛЯ ПАГИНАЦИИ ===

  // Пагинация... Хотелось без оверинженеринга, но получилось вот так
  const products = [...localProducts, ...allProducts];
  const total = products.length;
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const productsOnPage = products.slice(skip, skip + PRODUCTS_PER_PAGE);
  const fromProduct = productsOnPage.length > 0 ? skip + 1 : 0;
  const toProduct = skip + productsOnPage.length;

  // Всё ещё заглушка. Прогресс-бар в процессе
  if (loading) {
    return (
      <div className={styles.general}>
        <SearchProduct />
        <AddProduct onAdd={handleAddProduct} onRefresh={handleRefresh} />
        <div className={styles.loading}>Загрузка товаров...</div>
      </div>
    );
  }

  return (
    <div className={styles.general}>
      <SearchProduct />

      <AddProduct onAdd={handleAddProduct} onRefresh={handleRefresh} />

      <ProductsList
        page={currentPage}
        products={productsOnPage}
        onTotalChange={() => {}}
      />

      <ProductsCount
        total={total}
        fromProduct={fromProduct}
        toProduct={toProduct}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default ProductsPage;
