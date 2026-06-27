import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductItems } from '../shared/types/productItem';
import { ProductItemComponent } from '../shared/product-item/productItem.component';
import { NgClass, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BlogService } from 'src/services/BlogService';
import { Subscription } from 'rxjs';
import { map } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterOutlet, ProductItemComponent, NgClass, NgIf],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, DoCheck, OnDestroy {
  getBlogApi: Subscription;
  products: ProductItems[] = [
    
  ];

  handleDelete2 = (id: number) => {
    // id này được emit từ component con lên 
    const productIndex = this.products.findIndex((item) => item.id == id);
    if (productIndex != -1) {
      this.products.splice(productIndex, 1);
    }
    this.blogService.deleteBlog(id).subscribe(({data}:any) => {
      if(data == 1){
        this.products = this.products.filter(item=> item.id != id)
      }
    })
  };

  isActive = true;
  constructor(private blogService: BlogService) {
    this.getBlogApi = new Subscription();
  }
  ngOnInit(): void {
    this.getBlogApi = this.blogService
      .getBlogs()
      .pipe(
        map(({ data }) =>
          data
            .map((item: any) => {
              return {
                ...item,
                name: item.title,
                price: Number(item.body),
                image: '../assets/images/lego1.jpg',
              };
            })
            // .filter((product) => product.price > 300000),
        ),
      )
      .subscribe((res) => {
        this.products = res;
      });
  }
  ngDoCheck(): void {
    console.log('check component');
  }
  RemoveComponent(): void {
    this.isActive = false;
  }
  ngOnDestroy(): void {
    if (this.getBlogApi) {
      this.getBlogApi.unsubscribe();
      console.log('getBlogApi is unsubcribe');
    }
  }
}
