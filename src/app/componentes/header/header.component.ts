import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user.model';
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
  searchQuery: string = '';
  currentUser: User | null = null;
  private authSubscription: Subscription = new Subscription();
  private userSubscription: Subscription = new Subscription();

  constructor(
    private router: Router, 
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items: any[]) => {
      this.cartItemCount = items.reduce((total: number, item: any) => total + item.quantity, 0);
    });

    this.authSubscription = this.authService.isAuthenticated$.subscribe((isAuth: boolean) => {
      this.isLoggedIn = isAuth;
      if (!isAuth) {
        this.isProfileDropdownOpen = false;
        this.currentUser = null;
      }
    });

    this.userSubscription = this.authService.currentUser$.subscribe((user: User | null) => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  getUserDisplayName(): string {
    if (!this.currentUser) return '';
    
    const firstName = this.currentUser.name.split(' ')[0];
    return firstName;
  }

  openLoginModal() {
    this.router.navigate(['/login']);
  }

  openRegisterModal() {
    this.router.navigate(['/cadastro']);
  }

  scrollToSection(section: string): void {
    // Lógica de navegação se necessário
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

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/home'], { 
        queryParams: { q: this.searchQuery.trim() } 
      });
      this.closeMobileMenu();
    }
  }
}
