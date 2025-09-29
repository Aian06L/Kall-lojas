import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor() { }

  onSubmit(form: any) {
    const email = form.email;
    const password = form.password;

    // Simulated account check (replace with real API call)
    const existingUser = email === 'user@example.com' && password === 'password123';

    if (existingUser) {
      console.log('Login successful');
      // Redirect or perform post-login actions here
    } else {
      console.log('Account does not exist or invalid credentials');
      // Show error message to user
    }
  }

}
