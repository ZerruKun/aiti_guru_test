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

export interface IProductsList {
  products: IProduct[];
}

export interface IProductsResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface IAuthErrors {
  login?: string;
  password?: string;
  general?: string;
}

export interface ILoginCredentials {
  username: string;
  password: string;
  expiresInMins?: number;
}

// Поля от DummyJSON
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

export interface IAuthFormState {
  login: string;
  password: string;
  remember: boolean;
  loading: boolean;
}

export interface IProductsListProps {
  page: number;
  onTotalChange?: (total: number) => void;
}

export interface IProductItemProps {
  product: IProduct;
}

export interface IProductsCountProps {
  total: number;
  skip: number;
  limit: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
