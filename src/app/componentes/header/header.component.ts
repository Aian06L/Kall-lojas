import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router) {}

openLoginModal() {
 this.router.navigate(['/login']);
}
openRegisterModal() {
 this.router.navigate(['/register']);
}
scrollToSection(arg0: string) {

}

}
