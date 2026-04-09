// Для цифр внизу страницы
import { useState, useMemo, useCallback } from "react";
import type { IProduct } from "../types/types";

export const usePagination = (items: IProduct[], itemsPerPage: number = 20) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(items.length / itemsPerPage));
  }, [items.length, itemsPerPage]);

  const safePage = Math.max(1, Math.min(currentPage, totalPages));

  const skip = (safePage - 1) * itemsPerPage;
  
  const currentItems = useMemo(() => {
    return items.slice(skip, skip + itemsPerPage);
  }, [items, skip, itemsPerPage]);

  const fromProduct = currentItems.length > 0 ? skip + 1 : 0;
  const toProduct = skip + currentItems.length;

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage: safePage,
    totalPages,
    currentItems,
    fromProduct,
    toProduct,
    goToPage,
    resetPage,
  };
};

export default usePagination;