// Оставлено в одном файле с комментариями
// При необходимости можно будет разнести в отдельнве файлы

// Основные сущности
export interface IProduct {
  id: number;
  name: string;
  category: string;
  vendor: string;
  article: string;
  rating: number;
  price: number;
  thumbnail?: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

// Структуры ответов от серверов
export interface IProductsResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface IProductsList {
  products: IProduct[];
}

export interface ILoginCredentials {
  username: string;
  password: string;
  expiresInMins?: number;
}


// Авторизация и форма входа
export interface IAuthErrors {
  login?: string;
  password?: string;
  general?: string;
}

export interface IAuthFormState {
  login: string;
  password: string;
  remember: boolean;
  loading: boolean;
}

// Пропсы для компонентов

// Товары
export interface IProductsListProps {
  page: number;
  products: IProduct[];
  onTotalChange?: (total: number) => void;
  sortField?: ISortField;
  sortOrder?: ISortOrder;
  onSort?: (field: ISortField) => void;
}

export interface IProductItemProps {
  product: IProduct;
}

export interface IProductsCountProps {
  total: number;
  fromProduct: number;
  toProduct: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface IProductsHeaderProps {
  sortField: ISortField;
  sortOrder: ISortOrder;
  onSort: (field: ISortField) => void;
}

// Добавление товара
export interface IAddProductProps {
  onAdd: (product: {
    name: string;
    price: number;
    vendor: string;
    article: string;
    rating: number;
  }) => void;
  onRefresh?: () => void;
}

export interface IAddProductForm {
  name: string;
  price: string;
  vendor: string;
  article: string;
  rating: string;
}

export interface IAddProductErrors {
  name?: string;
  price?: string;
  vendor?: string;
  article?: string;
  rating?: string;
}

// Поиск и уведомления
export interface ISearchProductProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export interface IToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  duration?: number;
}

// Вспомогательные типы
export type ISortOrder = "asc" | "desc" | null;

export type ISortField = "rating" | "price" | null;

export interface IProductsCountPropsFixed extends IProductsCountProps {
  fromProduct: number;
  toProduct: number;
}