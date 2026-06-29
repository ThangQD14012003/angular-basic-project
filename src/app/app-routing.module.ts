import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';

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
    loadComponent: () =>
      import('./admin/admin-dashboard.component').then((m) => m.AdminDashboardComponent),
  },
  {
    path: 'orders-history',
    loadComponent: () =>
      import('./order-history/order-history.component').then((m) => m.OrderHistoryComponent),
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'detail/:idd', //idd ứng với idd ở detail lúc lấy ở trên param
    loadComponent: () =>
      import('./detail/detail.component').then((m) => m.DetailComponent),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./create/create.component').then((m) => m.CreateComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
