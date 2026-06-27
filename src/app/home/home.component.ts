import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductItems } from '../shared/types/productItem';
import { ProductItemComponent } from '../shared/product-item/productItem.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BlogService } from 'src/services/BlogService';
import { Subscription } from 'rxjs';
import { map } from 'rxjs';
import { currencyPipe } from '../shared/pipes/CurrencyPipe.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductItemComponent,
    NgClass,
    NgIf,
    NgFor,
    currencyPipe,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: ProductItems[] = [];
  getBlogApi: Subscription;
  constructor(private blogService: BlogService) {
    this.getBlogApi = new Subscription();
  }
  ngOnInit(): void {
    this.getBlogApi = this.blogService
      .getBlogs()
      .pipe(
        map(({ data }) =>
          data.map((item: any) => {
            return {
              ...item,
              name: item.title,
              price: Number(item.body),
              image: '../assets/images/lego1.jpg',
            };
          }),
        ),
      )
      .subscribe((res) => {
        this.products = res;
      });
  }
  ngOnDestroy(): void {
    if (this.getBlogApi) {
      this.getBlogApi.unsubscribe();
      console.log('getBlogApi is unsubcribe');
    }
  }
}
