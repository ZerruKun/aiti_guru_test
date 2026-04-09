// Сортировка по рейтингу или цене
import { useState } from "react";
import type { IProduct, ISortField, ISortOrder } from "../types/types";

export const useSort = () => {
  const [sortField, setSortField] = useState<ISortField>(null);
  const [sortOrder, setSortOrder] = useState<ISortOrder>(null);

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
  };

  const sortProducts = (products: IProduct[]): IProduct[] => {
    if (!sortField || !sortOrder) return products;

    const multiplier = sortOrder === "asc" ? 1 : -1;

    return [...products].sort((a, b) => {
      if (sortField === "rating") {
        return ((a.rating ?? 0) - (b.rating ?? 0)) * multiplier;
      } else if (sortField === "price") {
        return ((a.price ?? 0) - (b.price ?? 0)) * multiplier;
      }
      return 0;
    });
  };

  const resetSort = () => {
    setSortField(null);
    setSortOrder(null);
  };

  return { sortField, sortOrder, handleSort, sortProducts, resetSort };
};