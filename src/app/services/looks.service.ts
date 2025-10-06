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
      name: 'Blusa Básica',
      category: 'Casual',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
      description: 'Blusa confortável para uso diário.'
    },
    {
      id: 3,
      name: 'Calça Jeans',
      category: 'Casual',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d',
      description: 'Calça jeans clássica e versátil.'
    },
    {
      id: 4,
      name: 'Look Escritório',
      category: 'Escritório',
      image: 'https://m.media-amazon.com/images/I/413yP-SUH1L._SY1000_.jpg',
      description: 'Roupas elegantes para o ambiente profissional.'
    },
    {
      id: 5,
      name: 'Blazer Feminino',
      category: 'Escritório',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      description: 'Blazer sofisticado para reuniões de trabalho.'
    },
    {
      id: 6,
      name: 'Calça Social',
      category: 'Escritório',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1',
      description: 'Calça social elegante e profissional.'
    },
    {
      id: 7,
      name: 'Look Festa',
      category: 'Festa',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
      description: 'Vestimentas glamourosas para eventos especiais.'
    },
    {
      id: 8,
      name: 'Vestido de Festa',
      category: 'Festa',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
      description: 'Vestido deslumbrante para noites especiais.'
    },
    {
      id: 9,
      name: 'Conjunto Glamour',
      category: 'Festa',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa',
      description: 'Conjunto completo para festas e eventos.'
    },
    {
      id: 10,
      name: 'Look Esporte',
      category: 'Esporte',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      description: 'Roupas confortáveis para atividades físicas.'
    },
    {
      id: 11,
      name: 'Legging Esportiva',
      category: 'Esporte',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b',
      description: 'Legging resistente para exercícios intensos.'
    },
    {
      id: 12,
      name: 'Top Esportivo',
      category: 'Esporte',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256',
      description: 'Top confortável para treinos e corridas.'
    },
    {
      id: 13,
      name: 'Saia Plissada',
      category: 'Saias',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa',
      description: 'Saia plissada elegante para looks femininos.'
    },
    {
      id: 14,
      name: 'Conjunto com Saia',
      category: 'Saias',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
      description: 'Conjunto completo incluindo saia e blusa.'
    },
    {
      id: 15,
      name: 'Saia Jeans',
      category: 'Saias',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256',
      description: 'Saia jeans casual para o dia a dia.'
    },
    {
      id: 16,
      name: 'Look com Saia Longa',
      category: 'Saias',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
      description: 'Vestido ou conjunto com saia longa para eventos.'
    },
    {
      id: 17,
      name: 'Saia Midi',
      category: 'Saias',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa',
      description: 'Saia midi versátil para diversas ocasiões.'
    },
    {
      id: 18,
      name: 'Conjunto Saia e Blusa',
      category: 'Saias',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
      description: 'Conjunto harmonioso com saia e blusa combinando.'
    },
    {
      id: 19,
      name: 'Saia Curta',
      category: 'Saias',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256',
      description: 'Saia curta moderna e ousada.'
    },
    {
      id: 20,
      name: 'Look Saia e Sapatos',
      category: 'Saias',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446',
      description: 'Conjunto completo com saia e sapatos elegantes.'
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
