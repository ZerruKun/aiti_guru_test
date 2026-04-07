import type { IProduct } from "../types/types";

// Ответ от DummyJSON
export interface IApiProduct {
  id: number;
  title: string;
  category: string;
  brand: string;
  sku: string;
  rating: number;
  price: number;
  thumbnail?: string;
}

// Один товар
export const transformProduct = (api: IApiProduct): IProduct => ({
  id: api.id,
  name: api.title,
  category: api.category,
  vendor: api.brand,
  article: api.sku,
  rating: api.rating,
  price: api.price,
  thumbnail: api.thumbnail,
});

// Массив
export const transformProducts = (products: IApiProduct[]): IProduct[] =>
  products.map(transformProduct);