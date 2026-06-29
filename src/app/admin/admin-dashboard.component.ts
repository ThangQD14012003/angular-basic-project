import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/services/BlogService';
import { ProductItems, OrderDto } from '../shared/types/productItem';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { currencyPipe } from '../shared/pipes/CurrencyPipe.pipe';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, FormsModule, ReactiveFormsModule, currencyPipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  activeTab: 'products' | 'orders' = 'products';

  // Products state
  products: ProductItems[] = [];
  isEditingProduct: boolean = false;
  editingProductId: number | null = null;
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl(''),
    stockQuantity: new FormControl(100, [Validators.required]),
    availableQuantity: new FormControl(100, [Validators.required]),
    imageUrl: new FormControl('')
  });

  // Orders state
  orders: OrderDto[] = [];
  orderStatuses = [
    { id: 1, name: 'Pending' },
    { id: 2, name: 'Confirmed' },
    { id: 3, name: 'Shipping' },
    { id: 4, name: 'Completed' },
    { id: 5, name: 'Cancelled' }
  ];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadOrders();
  }

  // --- PRODUCT MANAGEMENT ---
  loadProducts() {
    this.blogService.getBlogs().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => console.error('Failed to load products', err)
    });
  }

  handleOpenAddProduct() {
    this.isEditingProduct = false;
    this.editingProductId = null;
    this.productForm.reset({
      name: '',
      price: 0,
      description: '',
      stockQuantity: 100,
      availableQuantity: 100,
      imageUrl: '../assets/images/lego1.jpg'
    });
  }

  handleEditProduct(product: ProductItems) {
    this.isEditingProduct = true;
    this.editingProductId = product.id;
    this.productForm.setValue({
      name: product.name,
      price: product.price,
      description: product.description || '',
      stockQuantity: product.stockQuantity ?? 100,
      availableQuantity: product.availableQuantity ?? 100,
      imageUrl: product.image || '../assets/images/lego1.jpg'
    });
  }

  handleSaveProduct() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.productForm.get('name')?.value,
      price: Number(this.productForm.get('price')?.value),
      description: this.productForm.get('description')?.value || '',
      stockQuantity: Number(this.productForm.get('stockQuantity')?.value || 100),
      availableQuantity: Number(this.productForm.get('availableQuantity')?.value || 100),
      imageUrl: this.productForm.get('imageUrl')?.value || '../assets/images/lego1.jpg',
      categoryId: 1 // Default Category
    };

    if (this.isEditingProduct && this.editingProductId) {
      this.blogService.adminUpdateProduct(this.editingProductId, payload).subscribe({
        next: () => {
          this.loadProducts();
          this.handleOpenAddProduct(); // reset
        },
        error: (err) => console.error('Failed to update product', err)
      });
    } else {
      this.blogService.adminCreateProduct(payload).subscribe({
        next: () => {
          this.loadProducts();
          this.handleOpenAddProduct();
        },
        error: (err) => console.error('Failed to create product', err)
      });
    }
  }

  handleDeleteProduct(id: number) {
    if (confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
      this.blogService.adminDeleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error('Failed to delete product', err)
      });
    }
  }

  // --- ORDER MANAGEMENT ---
  loadOrders() {
    this.blogService.adminGetOrders().subscribe({
      next: (res) => {
        this.orders = res.map((order) => this.normalizeOrder(order));
      },
      error: (err) => console.error('Failed to load orders', err)
    });
  }

  handleStatusChange(order: OrderDto, statusId: number) {
    const previousStatusId = order.orderStatusId;
    const previousStatusName = order.orderStatusName;
    const selectedStatus = this.orderStatuses.find((status) => status.id === statusId);

    order.orderStatusId = statusId;
    order.orderStatusName = selectedStatus?.name || previousStatusName;

    this.blogService.adminUpdateOrderStatus(order.id, statusId).subscribe({
      error: (err) => {
        order.orderStatusId = previousStatusId;
        order.orderStatusName = previousStatusName;
        console.error('Failed to update status', err);
      }
    });
  }

  private normalizeOrder(order: OrderDto): OrderDto {
    const rawOrder = order as OrderDto & Record<string, any>;
    const statusName = rawOrder.orderStatusName
      ?? rawOrder['OrderStatusName']
      ?? rawOrder['statusName']
      ?? rawOrder['StatusName']
      ?? rawOrder['orderStatus']?.name
      ?? rawOrder['OrderStatus']?.Name
      ?? '';

    const statusFromName = this.orderStatuses.find(
      (status) => status.name.toLowerCase() === String(statusName).toLowerCase()
    );

    const statusId = Number(
      rawOrder.orderStatusId
      ?? rawOrder['OrderStatusId']
      ?? rawOrder['statusId']
      ?? rawOrder['StatusId']
      ?? rawOrder['orderStatus']?.id
      ?? rawOrder['OrderStatus']?.Id
      ?? statusFromName?.id
      ?? 1
    );

    return {
      ...order,
      orderStatusId: statusId,
      orderStatusName: statusFromName?.name
        ?? this.orderStatuses.find((status) => status.id === statusId)?.name
        ?? String(statusName)
    };
  }
}
