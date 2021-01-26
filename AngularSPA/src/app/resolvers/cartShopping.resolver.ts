import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';
import { productForOrder } from '../models/productForOrder';
import { CartService } from '../services/cart.service';

@Injectable()
export class cartShoppingResolver implements Resolve<productForOrder>{
    constructor(private cart: CartService) {

    }
    resolve(): Observable<productForOrder> {
        return this.cart.getCart().pipe(
            catchError(err => {
                console.log(err);
                return of(null);
            })
        );
    }

} 