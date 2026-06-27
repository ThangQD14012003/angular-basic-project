export type ProductItems = {
    id: number; 
    name: string; 
    price: number; 
    image: string; 
    description: string
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
    quantity: number
}