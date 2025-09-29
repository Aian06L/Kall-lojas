import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClothingService {

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
}
