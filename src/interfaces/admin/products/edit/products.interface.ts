export interface Category {
    id: number;
    name: string;
}

export interface Product {
    title: string;
    description: string;
    price: number;
    images: string[];
    category_id: number | string;
}
