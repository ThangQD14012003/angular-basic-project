import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BlogItem, ProductItems } from '../shared/types/productItem';
import { CartItemComponent } from '../shared/cart-item/cartItem.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BlogService } from 'src/services/BlogService';
import { Subscription } from 'rxjs';
import { map } from 'rxjs';
import { currencyPipe } from '../shared/pipes/CurrencyPipe.pipe';
import { upperCasePipe } from '../shared/pipes/UpperCasePipe.pipe';

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
    upperCasePipe
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: ProductItems[] = [];
  getBlogApi: Subscription;
  constructor(private blogService: BlogService, private router:Router) {
    this.getBlogApi = new Subscription();
  }
  ngOnInit(): void {
  this.getBlogApi = this.blogService
    .getBlogs()
    .subscribe((res: ProductItems[]) => {
      this.products = res.map(item => ({
        ...item, 
        image: '../assets/images/lego1.jpg'
      }));
      
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
  const customerId = 1; 
  this.blogService.postCart(customerId, product.id)
    .subscribe({
      next: (res) => {
        console.log('Add to cart success', res);
        this.router.navigate(['/cart']); // hoặc không cần navigate
      },
      error: (err) => {
        console.error('Add to cart error', err);
      }
    });
}
}
