export interface IProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  fullDescription: string;
  benefits: string[];
  ingredients: string;
  howToUse: string;
  size: string;
  rating: number;
  reviews: number;
  badge: string;
  concerns: string[];
  url: string;
  stock?: number;
  sales?: number;
  outOfStock: boolean;
}
