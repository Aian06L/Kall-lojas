import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule]
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartItemCount: number = 0;
  isMobileMenuOpen: boolean = false;
  isLoggedIn: boolean = false;
  isProfileDropdownOpen: boolean = false;
  private authSubscription: Subscription = new Subscription();

  constructor(
    private router: Router, 
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Subscribe to cart changes
    this.cartService.cartItems$.subscribe((items: any[]) => {
      this.cartItemCount = items.reduce((total: number, item: any) => total + item.quantity, 0);
    });

    // Subscribe to authentication status
    this.authSubscription = this.authService.isAuthenticated$.subscribe((isAuth: boolean) => {
      this.isLoggedIn = isAuth;
      if (!isAuth) {
        this.isProfileDropdownOpen = false; // Close dropdown when logged out
      }
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  openLoginModal() {
    // Navigate to login route
    this.router.navigate(['/login']);
  }

  openRegisterModal() {
    // Navigate to cadastro route
    this.router.navigate(['/cadastro']);
  }

  scrollToSection(section: string): void {
    // Implement scrolling logic or routing here if needed
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  toggleProfileDropdown(): void {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  closeProfileDropdown(): void {
    this.isProfileDropdownOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.closeProfileDropdown();
    this.router.navigate(['/home']);
  }
}
