import { useState, useEffect, useMemo } from "react";
import AddProduct from "../components/AddProduct";
import SearchProduct from "../components/SearchProduct";
import ProductsList from "../components/ProductsList";
import ProductsCount from "../components/ProductsCount";
import Toast from "../components/Toast";
import ProgressBar from "../components/ProgressBar";
import { useAuth } from "../hooks/useAuth";
import { useProducts } from "../hooks/useProducts";
import { useSearch } from "../hooks/useSearch";
import { useSort } from "../hooks/useSort";
import { usePagination } from "../hooks/usePagination";
import { filterProducts } from "../utils/filters";
import styles from "../styles/modules/ProductsPage.module.css";

const PRODUCTS_PER_PAGE = 20;

const ProductsPage = () => {
  // Авторизация (редирект внутри хука)
  const { isChecking } = useAuth();

  // Товары
  const {
    products,
    loading,
    error,
    loadProducts,
    addProduct,
    clearLocalProducts,
  } = useProducts();

  // Поиск
  const { debouncedTerm, setSearchTerm } = useSearch(1000);

  // Сортировка
  const { sortField, sortOrder, handleSort, sortProducts } = useSort();

  // Toast (окошечно будет справа снизу)
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Для тестирования прогресс-бара
  // Прогресс загрузки (для прогресс-бара)
  // const [loadProgress, setLoadProgress] = useState(0);
  // Флаг: показываем ли прогресс-бар (даже если загрузка уже завершилась)
  // const [showProgress, setShowProgress] = useState(false);

  // Симуляция прогресса загрузки
  // useEffect(() => {
  //   if (loading) {
  //     setShowProgress(true);
  //     setLoadProgress(10);

  //     const interval = setInterval(() => {
  //       setLoadProgress((prev) => {
  //         const next = prev + Math.random() * 10;
  //         return next >= 90 ? 90 : next;
  //       });
  //     }, 300);

  //     return () => clearInterval(interval);
  //   } else {
  //     setLoadProgress(100);
  //     const timer = setTimeout(() => {
  //       setShowProgress(false);
  //     }, 500);

  //     return () => clearTimeout(timer);
  //   }
  // }, [loading]);

  // Фильтрация по поиску - пересчитывается только при изменении зависимостей
  const filteredProducts = useMemo(() => {
    return filterProducts(products, debouncedTerm);
  }, [products, debouncedTerm]);

  // Сортировка - пересчитывается только при изменении зависимостей
  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts);
  }, [filteredProducts, sortField, sortOrder]);

  // Пагинация - получает стабильный массив sortedProducts
  const {
    currentPage,
    totalPages,
    currentItems,
    fromProduct,
    toProduct,
    goToPage,
    resetPage,
  } = usePagination(sortedProducts, PRODUCTS_PER_PAGE);

  // Сброс страницы при поиске/сортировке
  useEffect(() => {
    resetPage();
  }, [debouncedTerm, sortField, resetPage]);

  // Товар будет добавляться в начало
  const handleAddProduct = (newProduct: {
    name: string;
    price: number;
    vendor: string;
    article: string;
    rating: number;
    category?: string;
  }) => {
    addProduct(newProduct);
    setToast({ message: "Товар успешно добавлен!", type: "success" });
  };

  // По сути повторный запрос из API
  // Добавленные "с руки" товары будут удаляться
  const handleRefresh = () => {
    clearLocalProducts();
    loadProducts();
    setToast({ message: "Список товаров обновлён", type: "success" });
  };

  // Поиск. Работает по 4-ём полям, срабатывает через сукунду после завершения ввода
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  // Загрлушка/прогресс-бар пока идёт проверка авторизации ИЛИ загрузка товаров
  if (
    isChecking ||
    (loading && products.length === 0)
    // ||
    // (showProgress && products.length === 0)
  ) {
    return (
      <div className={styles.general}>
        <SearchProduct searchTerm="" onSearchChange={() => {}} />
        <AddProduct onAdd={handleAddProduct} onRefresh={handleRefresh} />

        <div className={styles.loadingWrapper}>
          <ProgressBar progress={loading ? 50 : 100} label="Загрузка товаров" />
        </div>
      </div>
    );
  }

  // Ошибка, если что-то пошло не так
  if (error) {
    return (
      <div className={styles.general}>
        <div className={styles.error}>Ошибка: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.general}>
      <SearchProduct
        searchTerm={debouncedTerm}
        onSearchChange={handleSearchChange}
      />

      <AddProduct onAdd={handleAddProduct} onRefresh={handleRefresh} />

      <ProductsList
        page={currentPage}
        products={currentItems}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      <ProductsCount
        total={sortedProducts.length}
        fromProduct={fromProduct}
        toProduct={toProduct}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
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
