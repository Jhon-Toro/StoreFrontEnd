export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image_url: string;
    category_id: number;
    reviews?: Review[];
    average_rating?: number;
}

export interface Category {
    id: number;
    name: string;
    image?: string;
}

export interface Review {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    comment: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
}

export interface OrderItem {
    product: Product;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    user_id: number;
    created_at: string;
    total_price: number;
    payment_status: 'PENDING' | 'APPROVED' | 'FAILED';
    order_status: 'PACKING' | 'SHIPPING' | 'DELIVERED';
    items: OrderItem[];
}
