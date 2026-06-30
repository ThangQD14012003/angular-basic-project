import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth.service'; 

export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService); 
    const router = inject(Router); 
    const user = authService.getUser();
    const expectedRole = route.data['role'];
    if(!user) {
        router.navigate(['/login']);
        return false;
    }
    if(expectedRole && user.role !== expectedRole) {
        router.navigate(['/login']); 
        return false; 
    }
    return true; 
}