import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductItems } from '../../shared/types/productItem';
import { CartItemComponent } from '../../shared/cart-item/cartItem.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { BlogService } from 'src/services/BlogService';
import { Subscription } from 'rxjs';
import { currencyPipe } from '../../shared/pipes/CurrencyPipe.pipe';
import { upperCasePipe } from '../../shared/pipes/UpperCasePipe.pipe';
import { CartStateService } from '../../shared/services/cart-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    CartItemComponent,
    NgClass,
    NgIf,
    NgFor,
    currencyPipe,
    RouterLink,
    upperCasePipe,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: ProductItems[] = [];
  getBlogApi: Subscription;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private cartStateService: CartStateService
  ) {
    this.getBlogApi = new Subscription();
  }

  ngOnInit(): void {
    this.getBlogApi = this.blogService
      .getBlogs()
      .subscribe((res: ProductItems[]) => {
        this.products = res.map(item => {
          // Dùng imageUrl từ server nếu là URL tuyệt đối, fallback về ảnh mặc định
          const imageUrl = (item as any).imageUrl || item.image || '';
          const image = imageUrl.startsWith('http')
            ? imageUrl
            : '../assets/images/lego1.jpg';
          return { ...item, image };
        });

        console.log(this.products);
      });
  }

  ngOnDestroy(): void {
    if (this.getBlogApi) {
      this.getBlogApi.unsubscribe();
      console.log('getBlogApi is unsubcribe');
    }
  }

  handleAddToCart(product: ProductItems) {
    const userStr = localStorage.getItem('user');
    console.log('User from localStorage:', userStr); 
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }

    const customerId = JSON.parse(userStr).id; // localStorage luôn lưu trữ dưới dạng string nên cần parse; 
    console.log('Customer ID:', customerId);
    this.blogService.postCart(customerId, product.id)
      .subscribe({
        next: (res) => {
          console.log('Add to cart success', res);
          this.cartStateService.refreshCartCount(customerId);
        },
        error: (err) => {
          console.error('Add to cart error', err);
        },
      });
  }
}
