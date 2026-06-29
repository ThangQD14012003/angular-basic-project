export type ProductItems = {
    id: number; 
    name: string; 
    price: number; 
    image: string; 
    description: string;
    categoryId?: number;
    stockQuantity?: number;
    availableQuantity?: number;
}

export type BlogItem = {
    id?: number;
    name?: string;
    price?:string; 
}
export type CartItems = {
    id: number;
    productId: number; 
    productName: string; 
    price: number; 
    image: string; 
    description: string; 
    quantity: number;
}

export interface User {
    id: number;
    fullName: string;
    email: string;
    role: string;
    phone?: string;
    address?: string;
}

export interface OrderDetailDto {
    id: number;
    productId: number;
    productName: string;
    productImage: string;
    quantity: number;
    unitPrice: number;
    subTotal: number;
}

export interface OrderDto {
    id: number;
    userId: number;
    userFullName: string;
    userEmail: string;
    orderStatusId: number;
    orderStatusName: string;
    orderDate: string;
    totalAmount: number;
    shippingAddress: string;
    orderDetails: OrderDetailDto[];
}