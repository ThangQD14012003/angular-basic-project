import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogItem, CartItems, ProductItems } from 'src/app/shared/types/productItem';
import { ResponseData } from 'src/app/shared/types/responseData';
@Injectable({ providedIn: 'root' })
export class BlogService {
  constructor(private http: HttpClient) {}
  // getBlogs():Observable<ResponseData<ProductItems[]>>{
  //     return this.http.get<any>('https://localhost:7216/api/Product')
  // }

  getBlogs(): Observable<ProductItems[]> {
    return this.http.get<ProductItems[]>('https://localhost:7216/api/Product');
  }

  detailBlog(id: number): Observable<ResponseData<ProductItems>> {
    return this.http.get<any>(`https://localhost:7216/api/Product/${id}`);
  }
  postBlog(blogItem: BlogItem): Observable<ProductItems> {
    return this.http.post<any>(
      'https://localhost:7216/api/Product',
      blogItem,
    );
  }
  deleteBlog(id: number): Observable<ResponseData<ProductItems>> {
    return this.http.delete<any>(`https://ninedev-api.vercel.app/blogs/${id}`);
  }
  getCartByCustomer(customerId: number):Observable<CartItems[]>{
    return this.http.get<CartItems[]>(`https://localhost:7216/api/Cart/customer/${customerId}`); 
  }
}
