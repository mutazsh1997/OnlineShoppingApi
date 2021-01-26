import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Colors } from 'src/app/models/color';
import { Product } from 'src/app/models/product';
import { ProductForCart } from 'src/app/models/ProductForCart';
import { ProductService } from 'src/app/services/product.service';
import { Sizes } from 'src/app/models/size';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'product-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productDetails: Product;
  imageToDisplayUrl: string;
  productForCart: ProductForCart;

  @ViewChild('sliderScroll', { static: false }) sliderScroll: ElementRef;

  constructor(private productServise: ProductService, private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit() {
    this.productServise.getProduct(this.route.snapshot.queryParams['productId']).subscribe((res: Product) => {

      this.productDetails.colors[0].isSelected = true;
      this.productDetails.sizes[0].isSelected = true;
      this.productForCart = {
        color: this.productDetails.colors[0].color,
        quantity: 1,
        size: this.productDetails.sizes[0].size,
      };
    });
    this.route.data.subscribe(res => {
      this.productDetails = res.productDetails
      this.imageToDisplayUrl = this.productDetails.photoUrl;
    })
  }

  selectColor(selectedColor: Colors) {

    this.productDetails.colors.forEach(color => {
      if (selectedColor.id == color.id) {
        color.isSelected = true
        this.productForCart.color = color.color;
      } else {
        color.isSelected = false
      }
    })

  }
  selectSize(selectedSize: Sizes) {
    this.productDetails.sizes.forEach(size => {
      if (selectedSize.id == size.id) {
        size.isSelected = true
        this.productForCart.size = size.size;
      } else {
        size.isSelected = false
      }
    })

  }

  selectQuantity(quantity) {

    if (quantity.value > 1) {
      this.productForCart.quantity = parseInt(quantity.value);
    } else {
      quantity.value = 1
    }
  }

  addToCart(id: string) {

    this.cartService.addToCart(id, this.productForCart).subscribe(res => {
      this.cartService.getItemsInCart();
    }, err => {
      console.error(err);
    })

  }
  imageToDisplay(imgUrl) {
    this.imageToDisplayUrl = imgUrl;

  }

}