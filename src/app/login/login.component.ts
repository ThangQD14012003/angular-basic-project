import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BlogService } from 'src/services/BlogService';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('User', [Validators.required])
  });

  errorMessage: string = '';

  constructor(private blogService: BlogService, private router: Router) {}

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get role() { return this.loginForm.get('role'); }

  handleLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage = '';
    const credentials = {
      email: this.email?.value,
      password: this.password?.value
    };

    this.blogService.login(credentials).subscribe({
      next: (res) => {
        console.log('Login success', res);
        
        // Kiểm tra xem User có đúng role đang chọn hay không
        const loggedUser = res.user;
        const selectedRole = this.role?.value;

        if (loggedUser.role !== selectedRole) {
          this.errorMessage = `Tài khoản không thuộc quyền quản trị / khách hàng: ${selectedRole}`;
          return;
        }

        localStorage.setItem('user', JSON.stringify(loggedUser));

        if (loggedUser.role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['']);
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = err.error?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại email/mật khẩu.';
      }
    });
  }
}
