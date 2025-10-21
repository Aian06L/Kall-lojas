import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Primeiro verifica se está autenticado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Verifica se é admin para rotas de admin
    if (route.routeConfig?.path?.startsWith('admin/')) {
      if (!this.authService.isAdmin()) {
        this.router.navigate(['/home']);
        return false;
      }
    }

    return true;
  }
}