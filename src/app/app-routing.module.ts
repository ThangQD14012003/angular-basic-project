import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './user/cart/cart.component';
import { DetailComponent } from './user/detail/detail.component';
import { CreateComponent } from './user/create/create.component';
import { HomeComponent } from './user/home/home.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./admin/admin-dashboard.component').then((m) => m.AdminDashboardComponent),
  },
  {
    path: 'orders-history',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./user/order-history/order-history.component').then((m) => m.OrderHistoryComponent),
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () => 
      import('./user/cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'detail/:idd', //idd ứng với idd ở detail lúc lấy ở trên param
    loadComponent: () =>
      import('./user/detail/detail.component').then((m) => m.DetailComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./user/create/create.component').then((m) => m.CreateComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
