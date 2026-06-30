import {CanActivateFn, Router} from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService); 
    const router = inject(Router); 
    if(!authService.isLoggedIn()){
        router.navigate(['/login']); 
        console.log('User is not logged in. Redirecting to login page.');
        return false; 
    }
    console.log('User is logged in. Access granted to the route.');
    return true; 
}