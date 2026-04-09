// Фильтрация товаров по 4-ём полям
import type { IProduct } from "../types/types";

export const filterProducts = (products: IProduct[], searchTerm: string): IProduct[] => {
  if (!searchTerm.trim()) return products;

  const term = searchTerm.toLowerCase().trim();
  
  return products.filter((product) => {
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
};