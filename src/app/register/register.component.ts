import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BlogService } from 'src/services/BlogService';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    phone: new FormControl(''),
    address: new FormControl('')
  });

  errorMessage: string = '';
  successMessage: string = '';

  constructor(private blogService: BlogService, private router: Router) {}

  get fullName() { return this.registerForm.get('fullName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get phone() { return this.registerForm.get('phone'); }
  get address() { return this.registerForm.get('address'); }

  handleRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    const userModel = {
      fullName: this.fullName?.value,
      email: this.email?.value,
      password: this.password?.value,
      phone: this.phone?.value || '',
      address: this.address?.value || '',
      role: 'User' // Mặc định đăng ký cho khách hàng
    };

    this.blogService.register(userModel).subscribe({
      next: (res) => {
        console.log('Register success', res);
        this.successMessage = 'Đăng ký tài khoản thành công! Đang chuyển hướng đến trang đăng nhập...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Register failed', err);
        this.errorMessage = err.error?.message || 'Đăng ký tài khoản thất bại. Email có thể đã tồn tại.';
      }
    });
  }
}
