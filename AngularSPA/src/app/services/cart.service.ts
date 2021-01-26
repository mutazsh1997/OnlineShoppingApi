import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ProductForCart } from '../models/ProductForCart';
import { productForOrder } from '../models/productForOrder';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl = environment.apiUrl;
  itemsInCart: number = 0;

  total: number = 0;
  totalItemsInCart = 0;

  constructor(private http: HttpClient) { }

  addToCart(productId, prdouctToReturn: ProductForCart) {
    return this.http.post(`${this.baseUrl}cart/${productId}/${localStorage.getItem("cartKey")}`, prdouctToReturn);
  }
  getCartId() {
    return this.http.get(`${this.baseUrl}cart/cartId`, { responseType: 'text' });
  }
  getCart() {
    return this.http.get<productForOrder>(`${this.baseUrl}cart/${localStorage.getItem("cartKey")}`);
  }
  getItemsInCart() {
    let totalToCalc = 0;
    let totalItemsCalc = 0
    return this.getCart().forEach(el => {

      if (el == null) return;

      this.itemsInCart = el.items.length;
      el.items.map(item => {
        totalItemsCalc += item.quantity
        totalToCalc += item.productPrice * item.quantity;
      });
    }).then(() => {
      this.total = totalToCalc
      this.totalItemsInCart = totalItemsCalc
    })
  }

  updateItemQuentity(cartId: string, itemId: number, quantity: number) {

    return this.http.patch(`${this.baseUrl}cart?cartId=${cartId}&itemId=${itemId}`, quantity);

  }
  deleteItemFromCart(itemId) {
    return this.http.delete(`${this.baseUrl}cart/${itemId}/${localStorage.getItem("cartKey")}`);
  }

}
