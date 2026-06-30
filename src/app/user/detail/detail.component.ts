import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ProductItems } from '../../shared/types/productItem';
import { BlogService } from 'src/services/BlogService';
import { currencyPipe } from '../../shared/pipes/CurrencyPipe.pipe';
import { CartStateService } from '../../shared/services/cart-state.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    RouterOutlet,
    currencyPipe,
    NgIf,
    FormsModule
  ],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  idd = '';

  // Modal Mua Ngay
  showBuyNowModal = false;
  buyNowAddress: string = '';
  buyNowQuantity: number = 1;
  buyNowError: string = '';
  buyNowSuccess: string = '';
  isBuyingNow: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private cartStateService: CartStateService,
  ) {
    this.idd = String(route.snapshot.paramMap.get('idd'));
    console.log('id in constructor ', this.idd);
  }

  productItem: ProductItems = {
    id: 0,
    image: '',
    name: '',
    price: 0,
    description: ''
  };

  ngOnInit(): void {
    const productId = Number(this.idd);
    if (productId) {
      this.blogService.detailBlog(productId).subscribe((data: any) => {
        console.log('data11: ', data);
        // Dùng imageUrl từ server, fallback về ảnh mặc định nếu chưa có
        const imageUrl = data.imageUrl || data.image || '';
        this.productItem = {
          ...data,
          image: imageUrl.startsWith('http') ? imageUrl : '../assets/images/lego1.jpg'
        };
      });
    }

    // Prefill địa chỉ từ user đã lưu
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.buyNowAddress = user.address || '';
    }
  }

  handleAddToCart(product: ProductItems) {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }

    const customerId = JSON.parse(userStr).id;
    this.blogService.postCart(customerId, product.id).subscribe({
      next: (res) => {
        console.log('Add to cart success', res);
        this.cartStateService.refreshCartCount(customerId);
      },
      error: (err) => {
        console.error('Add to cart error', err);
      }
    });
  }

  openBuyNowModal() {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }
    this.buyNowError = '';
    this.buyNowSuccess = '';
    this.buyNowQuantity = 1;
    this.showBuyNowModal = true;
  }

  closeBuyNowModal() {
    this.showBuyNowModal = false;
    this.buyNowError = '';
    this.buyNowSuccess = '';
  }

  confirmBuyNow() {
    if (!this.buyNowAddress.trim()) {
      this.buyNowError = 'Vui lòng nhập địa chỉ nhận hàng';
      return;
    }
    if (this.buyNowQuantity < 1) {
      this.buyNowError = 'Số lượng phải ít nhất là 1';
      return;
    }

    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }

    const userId = JSON.parse(userStr).id;
    this.buyNowError = '';
    this.isBuyingNow = true;

    this.blogService.buyNow(userId, this.productItem.id, this.buyNowQuantity, this.buyNowAddress).subscribe({
      next: (res) => {
        this.buyNowSuccess = 'Đặt hàng thành công! Đang chuyển đến lịch sử mua hàng...';
        this.isBuyingNow = false;
        setTimeout(() => {
          this.closeBuyNowModal();
          this.router.navigate(['/orders-history']);
        }, 1500);
      },
      error: (err) => {
        this.isBuyingNow = false;
        this.buyNowError = err.error?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
      }
    });
  }
}
