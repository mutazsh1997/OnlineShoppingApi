import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Injectable()
export class productDetailsResolver implements Resolve<Product>{
    constructor(private product: ProductService) {

    }
    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        return this.product.getProduct(route.queryParams['productId']).pipe(
            catchError(err => {
                console.log(err);
                return of(null);
            })
        );
    }

}