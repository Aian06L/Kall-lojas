import { Component } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  constructor() { }

  onSubmit() {
    // Implement registration form submission logic here
    console.log('Registration form submitted');
  }

}
