import { Component, OnInit } from '@angular/core';
import { ClothingService } from '../../services/clothing.service';
import { LooksService } from '../../services/looks.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  womensClothingCatalog = [
    { id: 1, name: 'Vestido Floral', price: 149.90, imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c' },
    { id: 2, name: 'Blusa de Seda', price: 89.90, imageUrl: 'https://images.unsplash.com/photo-1521334884684-d80222895322' },
    { id: 3, name: 'Calça Jeans', price: 129.90, imageUrl: 'https://images.unsplash.com/photo-1514996937319-344454492b37' },
    { id: 4, name: 'Saia Midi', price: 99.90, imageUrl: 'https://images.unsplash.com/photo-1520975695911-1a1a1a1a1a1a' }
  ];

  carouselImages: string[] = [];
  filteredCatalog: any[] = [];

  constructor(private clothingService: ClothingService, private looksService: LooksService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.clothingService.getCarouselImages().subscribe(images => {
      this.carouselImages = images;
    });

    this.route.queryParams.subscribe(params => {
      const search = params['search'];
      if (search) {
        this.filteredCatalog = this.womensClothingCatalog.filter(product =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        this.filteredCatalog = this.womensClothingCatalog;
      }
    });
  }

  toggleFavorite(product: any): void {
    if (this.isFavorite(product)) {
      this.looksService.removeFavorite(product);
    } else {
      this.looksService.addFavorite(product);
    }
  }

  isFavorite(product: any): boolean {
    return this.looksService.isFavorite(product);
  }

  addToCart(product: any): void {
    console.log(`Added to cart: ${product.name}`);
  }

  buyNow(product: any): void {
    console.log(`Buying now: ${product.name}`);
  }
}
