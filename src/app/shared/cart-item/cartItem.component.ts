import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderLayoutComponent } from '../header-layout/header-layout.component';
import { FormsModule } from '@angular/forms';
import { currencyPipe } from '../pipes/CurrencyPipe.pipe';
import { upperCasePipe } from '../pipes/UpperCasePipe.pipe';
import { NgClass, NgFor } from '@angular/common';
import { CartItems, ProductItems } from '../types/productItem';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderLayoutComponent,
    FormsModule,
    currencyPipe,
    upperCasePipe,
    NgFor,
    NgClass,
    RouterLink,
  ],
  templateUrl: './cartItem.component.html',
  styleUrls: ['./cartItem.component.css'],
})
export class CartItemComponent implements OnDestroy {
  @Input() cartItems: CartItems[] = [];
  // lấy thuộc tính từ component cha truyền xuống
  @Output() dataEvent = new EventEmitter<number>();
  handleDeletee = (id: number) => {
    this.dataEvent.emit(id);
  };

  get totalPrice(): string {
    const sum = this.cartItems.reduce((total, item) => {
      return total + item.price;
    }, 0);
    return `Total Price ${sum} đ`; 
  }
  // luôn đồng bộ với products 
  ngOnDestroy(): void {
    console.log("conponent is destroyed"); 
  }
}
