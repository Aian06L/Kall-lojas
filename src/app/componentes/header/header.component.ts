import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor() { }

  openLoginModal() {
    // Logic to open login modal
    console.log('Open login modal');
  }

  openRegisterModal() {
    // Logic to open register modal
    console.log('Open register modal');
  }

  scrollToSection(section: string): void {
    // Implement scrolling logic or routing here if needed
  }

}
