import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BlogItem,
  CartItems,
  ProductItems,
  User,
  OrderDto
} from 'src/app/shared/types/productItem';
import { ResponseData } from 'src/app/shared/types/responseData';
@Injectable({ providedIn: 'root' })
export class BlogService {
  private baseUrl = 'https://localhost:7216/api';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<ProductItems[]> {
    return this.http.get<ProductItems[]>(`${this.baseUrl}/Product`);
  }

  detailBlog(id: number): Observable<ResponseData<ProductItems>> {
    return this.http.get<any>(`${this.baseUrl}/Product/${id}`);
  }
  postBlog(blogItem: any): Observable<ProductItems> {
    return this.http.post<any>(`${this.baseUrl}/Product`, blogItem);
  }
  deleteBlog(id: number): Observable<ResponseData<ProductItems>> {
    return this.http.delete<any>(`${this.baseUrl}/Cart/${id}`);
  }
  getCartByCustomer(customerId: number): Observable<CartItems[]> {
    return this.http.get<CartItems[]>(
      `${this.baseUrl}/Cart/customer/${customerId}`,
    );
  }
  postCart(customerId: number, productId: number): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/Cart/add?customerId=${customerId}&productId=${productId}`,
      {},
    );
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/User/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/User/login`, credentials);
  }

  placeOrder(userId: number, shippingAddress: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Order/place`, { userId, shippingAddress });
  }

  buyNow(userId: number, productId: number, quantity: number, shippingAddress: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Order/buy-now`, { userId, productId, quantity, shippingAddress });
  }

  getOrdersByUserId(userId: number): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.baseUrl}/Order/${userId}`);
  }

  adminGetProducts(): Observable<ProductItems[]> {
    return this.http.get<ProductItems[]>(`${this.baseUrl}/Admin/products`);
  }

  adminCreateProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Admin/products`, product);
  }

  adminUpdateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Admin/products/${id}`, product);
  }

  adminDeleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/Admin/products/${id}`);
  }

  adminGetOrders(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.baseUrl}/Admin/orders`);
  }

  adminUpdateOrderStatus(orderId: number, orderStatusId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Admin/orders/${orderId}/status`, { orderStatusId });
  }

  adminGetSettings(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Admin/settings`);
  }

  adminUpdateSettings(settings: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Admin/settings`, settings);
  }

  uploadProductImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ imageUrl: string }>(`${this.baseUrl}/Upload/image`, formData);
  }
}
