import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { catchError, map } from "rxjs/operators";
import { CategoryService } from '../services/category.service';

@Injectable()
export class ProductsResolver implements Resolve<Product[]> {
    constructor(
        private categorySerivce: CategoryService,
        private productServie: ProductService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
        if (route.routeConfig.path == '' || route.queryParams.categoryName == "All Porducts") {
            return this.productServie.getProductsList().pipe(
                catchError(err => {

                    console.log(err);
                    return of(null);
                })
            );
        } else {
            if (route.queryParams.categoryName != null) {
                return this.categorySerivce.getProductsByCategory(route.queryParams.categoryName).pipe(
                    catchError(err => {

                        console.log(err);
                        return of(null);
                    }))
            } else if (route.queryParams.queryValue) {
                return this.categorySerivce.QueryProducts(route.queryParams.queryValue).pipe(
                    catchError(err => {

                        console.log(err);
                        return of(null);
                    }))
            } else if (route.routeConfig.path == 'productsEditor') {
                return this.productServie.getProductsListForAdmin().pipe(
                    catchError(err => {

                        console.log(err);
                        return of(null);
                    }));
            }
            else {
                console.log('no product');
            }
        }
    }
}