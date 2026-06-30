import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/services/BlogService';
import { OrderDto } from '../../shared/types/productItem';
import { NgFor, NgIf, NgClass, DatePipe, CurrencyPipe } from '@angular/common';
import { currencyPipe } from '../../shared/pipes/CurrencyPipe.pipe';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, DatePipe, currencyPipe],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: OrderDto[] = [];
  userId: number = 0;
  isLoading: boolean = true;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.userId = user.id;
      this.loadOrders();
    } else {
      this.isLoading = false;
    }
  }

  loadOrders() {
    this.isLoading = true;
    this.blogService.getOrdersByUserId(this.userId).subscribe({
      next: (res) => {
        this.orders = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load orders', err);
        this.isLoading = false;
      }
    });
  }

  getStatusClass(statusName: string): string {
    switch (statusName?.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'shipping': return 'status-shipping';
      case 'completed': return 'status-completed';
      case 'cancelled': return 'status-cancelled';
      default: return 'status-default';
    }
  }
}
