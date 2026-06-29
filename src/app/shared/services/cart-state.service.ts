import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BlogService } from 'src/services/BlogService';

@Injectable({ providedIn: 'root' })
export class CartStateService { // dùng để lưu số lượng trong giỏ hàng 
  private cartItemCountSubject = new BehaviorSubject<number>(0); // biến đặc biệt của Rxjs để lưu trữ giá trị hiện tại 
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor(private blogService: BlogService) {}

  refreshCartCount(customerId: number) {
    this.blogService.getCartByCustomer(customerId).subscribe({
      next: (items) => {
        const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
        this.cartItemCountSubject.next(totalQuantity);
      },
      error: (err) => {
        console.error('Failed to refresh cart count', err); 
        this.cartItemCountSubject.next(0);
      },
    });
  }

  setCartItemCount(count: number) {
    this.cartItemCountSubject.next(count); // next là phát (emit) 1 giá trị cho tất cả những người đăng ký (subscribers) của BehaviorSubject. 
    // Khi bạn gọi next với một giá trị mới, tất cả các subscribers sẽ nhận được giá trị đó ngay lập tức.
  }
}
