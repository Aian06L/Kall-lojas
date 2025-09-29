import { Component, OnInit } from '@angular/core';
import { ClothingService } from '../../services/clothing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  womensClothingCatalog = [
    { id: 1, name: 'Vestido Floral', price: 149.90, imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c' },
    { id: 2, name: 'Blusa de Seda', price: 89.90, imageUrl: 'https://images.unsplash.com/photo-1521334884684-d80222895322' },
    { id: 3, name: 'Calça Jeans', price: 129.90, imageUrl: 'https://images.unsplash.com/photo-1514996937319-344454492b37' },
    { id: 4, name: 'Saia Midi', price: 99.90, imageUrl: 'https://images.unsplash.com/photo-1520975695911-1a1a1a1a1a1a' }
  ];

  carouselImages: string[] = [];

  constructor(private clothingService: ClothingService) { }

  ngOnInit(): void {
    this.clothingService.getCarouselImages().subscribe(images => {
      this.carouselImages = images;
    });
  }
}
