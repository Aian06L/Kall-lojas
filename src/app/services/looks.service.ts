import { Injectable } from '@angular/core';

export interface Look {
  id: number;
  name: string;
  category: string;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class LooksService {
  private looks: Look[] = [
    {
      id: 1,
      name: 'Look Casual',
      category: 'Casual',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
      description: 'Looks descontraídos para o dia a dia.'
    },
    {
      id: 2,
      name: 'Look Escritório',
      category: 'Escritório',
      image: 'https://m.media-amazon.com/images/I/413yP-SUH1L._SY1000_.jpg',
      description: 'Roupas elegantes para o ambiente profissional.'
    },
    {
      id: 3,
      name: 'Look Festa',
      category: 'Festa',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
      description: 'Vestimentas glamourosas para eventos especiais.'
    },
    {
      id: 4,
      name: 'Look Esporte',
      category: 'Esporte',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      description: 'Roupas confortáveis para atividades físicas.'
    }
  ];

  private favorites: Look[] = [];

  constructor() { }

  getLooks(): Look[] {
    return this.looks;
  }

  getLooksByCategory(category: string): Look[] {
    return this.looks.filter(look => look.category === category);
  }

  getCategories(): string[] {
    return [...new Set(this.looks.map(look => look.category))];
  }

  addFavorite(look: Look): void {
    if (!this.isFavorite(look)) {
      this.favorites.push(look);
    }
  }

  removeFavorite(look: Look): void {
    this.favorites = this.favorites.filter(fav => fav.id !== look.id);
  }

  isFavorite(look: Look): boolean {
    return this.favorites.some(fav => fav.id === look.id);
  }

  getFavorites(): Look[] {
    return this.favorites;
  }
}
