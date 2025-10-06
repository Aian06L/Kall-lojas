import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule]
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items: any[]) => {
      this.cartItemCount = items.reduce((total: number, item: any) => total + item.quantity, 0);
    });
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
}
