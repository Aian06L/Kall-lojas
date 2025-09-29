import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  womensClothingCatalog = [
    { id: 1, name: 'Vestido Floral', price: 149.90, imageUrl: 'assets/vestido-floral.jpg' },
    { id: 2, name: 'Blusa de Seda', price: 89.90, imageUrl: 'assets/blusa-seda.jpg' },
    { id: 3, name: 'Calça Jeans', price: 129.90, imageUrl: 'assets/calca-jeans.jpg' },
    { id: 4, name: 'Saia Midi', price: 99.90, imageUrl: 'assets/saia-midi.jpg' }
  ];

  constructor() { }
}
