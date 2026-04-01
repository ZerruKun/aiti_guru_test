export interface IUser {
    login: string;
    password: string;
    isSaving: boolean;
}

export interface IProduct {
    name: string
    category: string
    vendor: string
    article: string
    rating: number
    price: number
}

export interface IProductsList {
    products: IProduct[]
}