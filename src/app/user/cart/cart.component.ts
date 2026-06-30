import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CartItems } from '../../shared/types/productItem';
import { CartItemComponent } from '../../shared/cart-item/cartItem.component';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { BlogService } from 'src/services/BlogService';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CartStateService } from '../../shared/services/cart-state.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterOutlet, CartItemComponent, NgClass, NgIf, NgFor, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  getBlogApi: Subscription;
  cartItems: CartItems[] = [];
  userId: number = 0;
  userAddress: string = '';
  shippingAddress: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isActive = true;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private cartStateService: CartStateService
  ) {
    this.getBlogApi = new Subscription();
  }

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }

    const user = JSON.parse(userStr);
    console.log('User onInit:', user);
    this.userId = user.id;
    this.userAddress = user.address || '';
    this.shippingAddress = this.userAddress;
    this.loadCart();
  }

  loadCart() {
    this.getBlogApi = this.blogService
      .getCartByCustomer(this.userId)
      .subscribe({
        next: (res) => {
          console.log('Cart items loaded', res);
          this.cartItems = res.map(item => ({
            ...item,
            image: item.image || '../assets/images/lego1.jpg'
          }));
          this.updateCartItemCount();
        },
        error: (err) => console.error('Failed to load cart', err)
      });
  }

  handleDelete2 = (id: number) => {
    this.blogService.deleteBlog(id).subscribe({
      next: (res: any) => {
        console.log('Item deleted successfully', res);
        this.cartItems = this.cartItems.filter(item => item.id !== id);
        this.updateCartItemCount();
      },
      error: (err) => console.error('Failed to delete item', err)
    });
  };

  handleCheckout() {
    if (!this.shippingAddress.trim()) {
      this.errorMessage = 'Vui lòng nhập địa chỉ nhận hàng';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.blogService.placeOrder(this.userId, this.shippingAddress).subscribe({
      next: (res) => {
        this.successMessage = 'Đặt hàng thành công! Đang chuyển đến lịch sử mua hàng...';
        this.cartItems = [];
        this.updateCartItemCount();
        setTimeout(() => {
          this.router.navigate(['/orders-history']);
        }, 2000);
      },
      error: (err) => {
        console.error('Checkout failed', err);
        this.errorMessage = err.error?.message || 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.getBlogApi) {
      this.getBlogApi.unsubscribe();
    }
  }

  private updateCartItemCount(): void {
    const totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.cartStateService.setCartItemCount(totalQuantity);
    console.log('Updated cart item count:', totalQuantity);
  }
}
