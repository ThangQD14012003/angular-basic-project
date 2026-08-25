import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BlogItem,
  CartItems,
  ProductItems,
} from 'src/app/shared/types/productItem';
import { ResponseData } from 'src/app/shared/types/responseData';
import { environment } from 'src/enviroments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<ProductItems[]> {
    return this.http.get<ProductItems[]>(`${this.baseUrl}/Product`);
  }

  detailBlog(id: number): Observable<ResponseData<ProductItems>> {
    return this.http.get<any>(`${this.baseUrl}/Product/${id}`);
  }

  postBlog(blogItem: BlogItem): Observable<ProductItems> {
    return this.http.post<any>(`${this.baseUrl}/Product`, blogItem);
  }
}
