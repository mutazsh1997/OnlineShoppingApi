import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { productForOrder } from '../models/productForOrder';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  productsForOrder: productForOrder;

  constructor(public cartService: CartService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(data => {

      this.productsForOrder = data.shoppingCart;
    });

  }
  removeItemFormCart(itemId) {

    this.cartService.deleteItemFromCart(itemId).subscribe(res => {
      this.productsForOrder.items.splice(this.productsForOrder.items.findIndex(item => item.productId == itemId), 1);
    }, err => console.error(err), () => {
      this.cartService.getItemsInCart();
    })
  }

  updateQuantity(itemId, quantity, toChange?) {

    if (quantity.value > 0) {
      if (toChange == 'plus') {
        quantity.value++
      } else if (toChange == 'minus' && quantity.value > 1) {
        quantity.value--
      }
      let quantityPass = parseInt(quantity.value)

      this.cartService.updateItemQuentity(this.productsForOrder.cartId, itemId, quantityPass).subscribe(() => {

      }, err => {
        console.log(err);
      }, () => {
        this.cartService.getItemsInCart();
      })
    } else {
      quantity.value = 1
    }
  }


}
