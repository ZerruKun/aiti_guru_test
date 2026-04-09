// "Менеджер товаров" - загрузка, хранение, добавление, обновление
import { useState, useEffect } from "react";
import type { IProduct } from "../types/types";

export const useProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [localProducts, setLocalProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://dummyjson.com/products?limit=200&skip=0`);
      if (!response.ok) throw new Error("Не удалось загрузить товары");
      
      const data = await response.json();
      const transformed = data.products.map((api: any): IProduct => ({
        id: api.id,
        name: api.title,
        category: api.category,
        vendor: api.brand,
        article: api.sku,
        rating: api.rating,
        price: api.price,
        thumbnail: api.thumbnail,
      }));

      setProducts(transformed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = (newProduct: {
    name: string;
    price: number;
    vendor: string;
    article: string;
    rating: number;
    category?: string;
  }) => {
    const product: IProduct = {
      ...newProduct,
      id: Date.now(),
      category: newProduct.category || "new",
      thumbnail: "",
    };
    setLocalProducts((prev) => [product, ...prev]);
  };

  const clearLocalProducts = () => {
    setLocalProducts([]);
  };

  const allProducts = [...localProducts, ...products];

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products: allProducts,
    loading,
    error,
    loadProducts,
    addProduct,
    clearLocalProducts,
  };
};

export default useProducts;