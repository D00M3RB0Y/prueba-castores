// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('myToken');
    if (!token) {
      this.router.navigate(['/login']); // redirige si no hay token
      return false;
    }
    return true;
  }
}
