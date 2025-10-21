export interface Clothing {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  description?: string;
  sizes?: string[];
  stock?: number;
  color?: string;
  discount?: number;
}
