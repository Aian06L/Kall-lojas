import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

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

}
