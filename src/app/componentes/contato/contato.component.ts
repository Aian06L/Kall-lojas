import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contato',
  template: `
    <h2>Contato</h2>
    <form (ngSubmit)="onSubmit()" #contactForm="ngForm">
      <div>
        <label for="name">Nome:</label>
        <input type="text" id="name" name="name" [(ngModel)]="contact.name" required />
      </div>
      <div>
        <label for="description">Descrição:</label>
        <textarea id="description" name="description" [(ngModel)]="contact.description" required></textarea>
      </div>
      <button type="submit" [disabled]="!contactForm.form.valid">Enviar</button>
    </form>
    <div *ngIf="submitted">
      <p>Obrigado pelo contato, {{ contact.name }}! Responderemos em breve.</p>
    </div>
  `,
  styles: [`
    h2 {
      color: #e67e22;
      margin-bottom: 20px;
    }
    form div {
      margin-bottom: 10px;
    }
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }
    input, textarea {
      width: 100%;
      padding: 6px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-family: Arial, sans-serif;
    }
    button {
      background-color: #e67e22;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ContatoComponent {
  contact = {
    name: '',
    description: ''
  };
  submitted = false;

  onSubmit() {
    if (this.contact.name && this.contact.description) {
      this.submitted = true;
      // Here you could add logic to send the form data to a server
      console.log('Contact form submitted:', this.contact);
    }
  }
}
