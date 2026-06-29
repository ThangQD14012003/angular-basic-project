import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Subscription, filter } from 'rxjs';
import { CartStateService } from '../services/cart-state.service';

@Component({
  selector: 'header-layout',
  standalone: true,
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.css'],
  imports: [RouterLink, NgIf],
})
export class HeaderLayoutComponent implements OnInit, OnDestroy {
  user: any = null;
  private routerSubscription: Subscription = new Subscription();
  private cartCountSubscription: Subscription = new Subscription();
  cartItemCount: number = 0;

  constructor(
    private router: Router,
    private cartStateService: CartStateService
  ) {}

  ngOnInit(): void {
    this.cartCountSubscription = this.cartStateService.cartItemCount$.subscribe(
      count => this.cartItemCount = count
    );
    this.checkUserSession();
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.checkUserSession());
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.cartCountSubscription.unsubscribe();
  }

  checkUserSession() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.user = JSON.parse(userStr);
      if (this.user.role === 'User') {
        this.cartStateService.refreshCartCount(this.user.id);
      } else {
        this.cartStateService.setCartItemCount(0);
      }
    } else {
      this.user = null;
      this.cartStateService.setCartItemCount(0);
    }
  }

  handleLogout() {
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/login']);
  }
}
