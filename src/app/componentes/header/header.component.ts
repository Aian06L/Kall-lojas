import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FavoritosComponent } from '../favoritos/favoritos.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterModule, FavoritosComponent]
})
export class HeaderComponent {
  searchQuery: string = '';

  constructor(private router: Router) { }

  openLoginModal() {
    // Navigate to login route
    this.router.navigate(['/login']);
  }

  openRegisterModal() {
    // Navigate to register route
    this.router.navigate(['/register']);
  }

  scrollToSection(section: string): void {
    // Implement scrolling logic or routing here if needed
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/home'], { queryParams: { search: this.searchQuery.trim() } });
    }
  }
}
