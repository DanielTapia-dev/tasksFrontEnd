import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      return true; // Permitir acceso
    } else {
      this.router.navigate(['/login']); // Redirigir al login si no está autenticado
      return false; // Bloquear acceso
    }
  }
}
