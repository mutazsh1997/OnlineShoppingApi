import { Product } from './product';

export interface Categories {
    id: number;
    categoryName: string;
    products: Product[];
} 