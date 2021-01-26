import { Categories } from './categories';
import { Colors } from './color';
import { Photo } from './photo';
import { Sizes } from './size';

export interface Product {
    id: string;
    name: string;
    price: number;
    productDescription: string;
    quantity: number;
    photoUrl: string;
    productType: string;
    created: Date;
    photos?: Photo[];
    sizes?: Sizes[];
    colors?: Colors[];
    category: Categories;
}