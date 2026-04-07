import { useState, useEffect } from "react";
import type { IProductsResponse } from "../types/types";
import { transformProducts } from "../utils/transformers";

export const useProducts = (page: number, limit: number = 20) => {
  const [data, setData] = useState<IProductsResponse>({
    products: [],
    total: 0,
    skip: 0,
    limit,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const skip = (page - 1) * limit;
    
    setLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then((res) => {
        if (!res.ok) throw new Error("Не удалось загрузить товары");
        return res.json();
      })
      .then((apiData) => {
        const products = transformProducts(apiData.products);
        setData({
          products,
          total: apiData.total,
          skip: apiData.skip,
          limit: apiData.limit,
        });
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, limit]);

  return { ...data, loading, error };
};