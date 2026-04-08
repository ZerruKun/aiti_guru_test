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

  // Сортировка
  const [sortField, setSortField] = useState<ISortField>(null);
  const [sortOrder, setSortOrder] = useState<ISortOrder>(null);

  // Поиск
  const [searchTerm, setSearchTerm] = useState("");

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

  // Обновление и очиска (две стрелочки рядом с "Добавить")
  const handleRefresh = () => {
    setLocalProducts([]);
    loadProducts();
    setToast({ message: "Список товаров обновлён", type: "success" });
  };

  // Загрузка при первом рендере
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

  // Обработчик поиска
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Обработчик сортировки
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
  let products = [...localProducts, ...allProducts];

  // Фильтрация по поиску (если есть searchTerm, ище по 4-ём полям)
  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase().trim();
    products = products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const vendor = product.vendor?.toLowerCase() || "";
      const article = product.article?.toLowerCase() || "";
      const category = product.category?.toLowerCase() || "";

      return (
        name.includes(term) ||
        vendor.includes(term) ||
        article.includes(term) ||
        category.includes(term)
      );
    });
  }

  // Применение сортировки
  const sortedProducts = [...products].sort((a, b) => {
    if (!sortField || !sortOrder) return 0;

    const multiplier = sortOrder === "asc" ? 1 : -1;

    if (sortField === "rating") {
      return ((a.rating ?? 0) - (b.rating ?? 0)) * multiplier;
    } else if (sortField === "price") {
      return ((a.price ?? 0) - (b.price ?? 0)) * multiplier;
    }

    return 0;
  });

  // Общее количество товаров (после фильтрации и сортировки)
  const total = sortedProducts.length;
  // Общее количество страниц
  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  // Вычисляем skip для текущей страницы
  const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;
  // Товары ТОЛЬКО текущей страницы
  const productsOnPage = sortedProducts.slice(skip, skip + PRODUCTS_PER_PAGE);
  // Вычисление для отображения
  const fromProduct = productsOnPage.length > 0 ? skip + 1 : 0;
  const toProduct = skip + productsOnPage.length;

  // Всё ещё заглушка. Прогресс-бар в процессе
  if (loading) {
    return (
      <div className={styles.general}>
        <SearchProduct
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        <AddProduct onAdd={handleAddProduct} onRefresh={handleRefresh} />
        <div className={styles.loading}>Загрузка товаров...</div>
      </div>
    );
  }

  return (
    <div className={styles.general}>
      <SearchProduct
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

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
