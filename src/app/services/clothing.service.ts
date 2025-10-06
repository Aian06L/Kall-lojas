import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Clothing } from '../model/clothing.model';

@Injectable({
  providedIn: 'root'
})
export class ClothingService {

  private clothingCatalog: Clothing[] = [
    // Categoria Casual
    { id: 1, name: 'Camiseta Básica Branca', price: 39.90, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab', category: 'Casual', description: 'Camiseta básica de algodão, perfeita para o dia a dia.' },
    { id: 2, name: 'Calça Jeans Skinny', price: 129.90, imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d', category: 'Casual', description: 'Calça jeans skinny de alta qualidade.' },
    { id: 3, name: 'Blusa Casual Listrada', price: 59.90, imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050', category: 'Casual', description: 'Blusa listrada confortável para uso diário.' },
    { id: 4, name: 'Shorts Jeans', price: 79.90, imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1', category: 'Casual', description: 'Shorts jeans versátil para dias quentes.' },
    { id: 5, name: 'Moletom Feminino', price: 89.90, imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b', category: 'Casual', description: 'Moletom confortável para dias frescos.' },

    // Categoria Escritório
    { id: 6, name: 'Blazer Feminino Preto', price: 199.90, imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', category: 'Escritório', description: 'Blazer elegante para ambiente profissional.' },
    { id: 7, name: 'Calça Social Preta', price: 149.90, imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1', category: 'Escritório', description: 'Calça social de corte reto, ideal para trabalho.' },
    { id: 8, name: 'Camisa Social Branca', price: 119.90, imageUrl: 'https://m.media-amazon.com/images/I/413yP-SUH1L._SY1000_.jpg', category: 'Escritório', description: 'Camisa social clássica e sofisticada.' },
    { id: 9, name: 'Saia Lápis Cinza', price: 109.90, imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa', category: 'Escritório', description: 'Saia lápis elegante para reuniões importantes.' },
    { id: 10, name: 'Colete Social', price: 89.90, imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', category: 'Escritório', description: 'Colete versátil para compor looks executivos.' },

    // Categoria Festa
    { id: 11, name: 'Vestido Longo Preto', price: 299.90, imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446', category: 'Festa', description: 'Vestido longo elegante para eventos especiais.' },
    { id: 12, name: 'Vestido Curto Dourado', price: 249.90, imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8', category: 'Festa', description: 'Vestido dourado deslumbrante para festas.' },
    { id: 13, name: 'Conjunto Crop Top e Saia', price: 179.90, imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa', category: 'Festa', description: 'Conjunto moderno para baladas e festas.' },
    { id: 14, name: 'Macacão de Festa', price: 219.90, imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446', category: 'Festa', description: 'Macacão sofisticado para eventos noturnos.' },
    { id: 15, name: 'Vestido Midi Brilhante', price: 199.90, imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8', category: 'Festa', description: 'Vestido midi com detalhes brilhantes.' },

    // Categoria Esporte
    { id: 16, name: 'Legging Fitness Preta', price: 79.90, imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b', category: 'Esporte', description: 'Legging resistente para atividades físicas.' },
    { id: 17, name: 'Top Esportivo Rosa', price: 49.90, imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256', category: 'Esporte', description: 'Top confortável para treinos intensos.' },
    { id: 18, name: 'Conjunto Fitness', price: 119.90, imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b', category: 'Esporte', description: 'Conjunto completo para academia.' },
    { id: 19, name: 'Shorts Fitness', price: 59.90, imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b', category: 'Esporte', description: 'Shorts confortável para corrida.' },
    { id: 20, name: 'Regata Esportiva', price: 39.90, imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256', category: 'Esporte', description: 'Regata respirável para treinos.' },

    // Categoria Saias
    { id: 21, name: 'Saia Plissada Rosa', price: 99.90, imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa', category: 'Saias', description: 'Saia plissada elegante e feminina.' },
    { id: 22, name: 'Saia Jeans Curta', price: 89.90, imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256', category: 'Saias', description: 'Saia jeans casual para o dia a dia.' },
    { id: 23, name: 'Saia Midi Floral', price: 119.90, imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8', category: 'Saias', description: 'Saia midi com estampa floral delicada.' },
    { id: 24, name: 'Saia Longa Boho', price: 139.90, imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446', category: 'Saias', description: 'Saia longa estilo boho chic.' },
    { id: 25, name: 'Saia A Line', price: 109.90, imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a6aaaa', category: 'Saias', description: 'Saia evasê clássica e versátil.' },

    // Categoria Vestidos
    { id: 26, name: 'Vestido Floral Midi', price: 149.90, imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c', category: 'Vestidos', description: 'Vestido midi com estampa floral romântica.' },
    { id: 27, name: 'Vestido Tubinho Preto', price: 129.90, imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8', category: 'Vestidos', description: 'Vestido tubinho clássico e elegante.' },
    { id: 28, name: 'Vestido Maxi Verão', price: 179.90, imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446', category: 'Vestidos', description: 'Vestido longo perfeito para o verão.' },
    { id: 29, name: 'Vestido Chemise', price: 99.90, imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c', category: 'Vestidos', description: 'Vestido chemise confortável e moderno.' },
    { id: 30, name: 'Vestido Wrap', price: 159.90, imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8', category: 'Vestidos', description: 'Vestido transpassado elegante.' },

    // Categoria Calças
    { id: 31, name: 'Calça Wide Leg', price: 149.90, imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1', category: 'Calças', description: 'Calça wide leg moderna e confortável.' },
    { id: 32, name: 'Calça Jogger Feminina', price: 89.90, imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d', category: 'Calças', description: 'Calça jogger para looks casuais.' },
    { id: 33, name: 'Calça Flare Jeans', price: 139.90, imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d', category: 'Calças', description: 'Calça jeans flare retrô.' },
    { id: 34, name: 'Calça Alfaiataria', price: 169.90, imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1', category: 'Calças', description: 'Calça de alfaiataria sofisticada.' },
    { id: 35, name: 'Calça Cargo', price: 119.90, imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d', category: 'Calças', description: 'Calça cargo utilitária e estilosa.' },

    // Categoria Blusas
    { id: 36, name: 'Blusa de Seda', price: 189.90, imageUrl: 'https://images.unsplash.com/photo-1521334884684-d80222895322', category: 'Blusas', description: 'Blusa de seda luxuosa e elegante.' },
    { id: 37, name: 'Blusa Ombro a Ombro', price: 79.90, imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050', category: 'Blusas', description: 'Blusa ombro a ombro feminina.' },
    { id: 38, name: 'Blusa Manga Bufante', price: 99.90, imageUrl: 'https://images.unsplash.com/photo-1521334884684-d80222895322', category: 'Blusas', description: 'Blusa com manga bufante romântica.' },
    { id: 39, name: 'Blusa Cropped', price: 69.90, imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050', category: 'Blusas', description: 'Blusa cropped moderna e jovial.' },
    { id: 40, name: 'Blusa Regata Social', price: 59.90, imageUrl: 'https://images.unsplash.com/photo-1521334884684-d80222895322', category: 'Blusas', description: 'Regata elegante para trabalho.' }
  ];

  constructor() { }

  getCarouselImages(): Observable<string[]> {
    const images = [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c',
      'https://images.unsplash.com/photo-1521334884684-d80222895322',
      'https://images.unsplash.com/photo-1514996937319-344454492b37',
      'https://images.unsplash.com/photo-1520975695911-1a1a1a1a1a1a'
    ];
    return of(images);
  }

  getAllClothing(): Observable<Clothing[]> {
    return of(this.clothingCatalog);
  }

  getClothingByCategory(category: string): Observable<Clothing[]> {
    const filtered = this.clothingCatalog.filter(item => item.category === category);
    return of(filtered);
  }

  getCategories(): Observable<string[]> {
    const categories = [...new Set(this.clothingCatalog.map(item => item.category))];
    return of(categories);
  }

  searchClothing(searchTerm: string): Observable<Clothing[]> {
    const filtered = this.clothingCatalog.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return of(filtered);
  }
}
