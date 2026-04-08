import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import SearchProduct from "../components/SearchProduct";
import ProductsList from "../components/ProductsList";
import ProductsCount from "../components/ProductsCount";
import Toast from "../components/Toast";
import styles from "../styles/modules/ProductsPage.module.css";
import type { IProduct, ISortField, ISortOrder } from "../types/types";

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

  // Для сортировки
  const [sortField, setSortField] = useState<ISortField>(null);
  const [sortOrder, setSortOrder] = useState<ISortOrder>(null);

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

  // Обновление и очистка (кнопка со стрелочками длябом с "Добавить")
  const handleRefresh = () => {
    setLocalProducts([]);
    loadProducts();
    setToast({ message: "Список товаров обновлён", type: "success" });
  };

  // Первый рендер
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

  // Сортировка
  const handleSort = (field: ISortField) => {
    if (sortField === field) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else if (sortOrder === "desc") {
        setSortField(null);
        setSortOrder(null);
      } else {
        setSortOrder("asc");
      }
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  // Пагинация... Хотелось без оверинженеринга, но получилось вот так.
  const products = [...localProducts, ...allProducts];
  const sortedProducts = [...products].sort((a, b) => {
    if (!sortField || !sortOrder) return 0;
    const multiplier = sortOrder === "asc" ? 1 : -1;
    if (sortField === "rating") {
      return (a.rating - b.rating) * multiplier;
    } else if (sortField === "price") {
      return (a.price - b.price) * multiplier;
    }
    return 0;
  });
  const total = sortedProducts.length;
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const productsOnPage = sortedProducts.slice(skip, skip + PRODUCTS_PER_PAGE);
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
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
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
