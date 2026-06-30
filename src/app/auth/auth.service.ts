import {Injectable} from '@angular/core';   
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    setSession(user: any, token: string) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return localStorage.getItem("token");
    }

    getUser(): any {
        const userStr = localStorage.getItem("user");
        return userStr != null ? JSON.parse(userStr): null; 
    }

    isLoggedIn(): boolean {
        console.log('Checking if user is logged in. Token:', this.getToken());
        return !!this.getToken(); 
    }

    logout(): void {
        localStorage.removeItem("token");   
        localStorage.removeItem("user");
    }
}