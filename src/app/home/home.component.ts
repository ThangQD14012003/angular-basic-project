import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BlogItem, ProductItems } from '../shared/types/productItem';
import { ProductItemComponent } from '../shared/product-item/productItem.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BlogService } from 'src/services/BlogService';
import { Subscription } from 'rxjs';
import { map } from 'rxjs';
import { currencyPipe } from '../shared/pipes/CurrencyPipe.pipe';

@Component({
  selector: 'app-home',
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
    const blogItem: BlogItem = {
      id: Math.random(),
      name: String(product.name),
      price: String(product.price),
    };

    this.blogService.postBlog(blogItem).subscribe(({data}:any)=> 
    {
      if(data.id){
        this.router.navigate(['/cart']);
      }
    })
  }
}
