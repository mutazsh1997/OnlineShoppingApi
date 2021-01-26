import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/User';
import { AuthenticatonService } from '../services/authenticaton.service';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  createOrderForm: FormGroup;
  saveCheckOutData = false;
  constructor(private user: AuthenticatonService, private orderServise: OrderService, public cart: CartService) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('user'));

    this.createOrderForm = new FormGroup({
      FirstName: new FormControl(user.userName || '', Validators.required),
      LastName: new FormControl('', Validators.required),
      Email: new FormControl(user.email || '', Validators.required),
      Phone: new FormControl('', Validators.required),
      City: new FormControl(user.city || '', Validators.required),
      Address: new FormControl(user.address || '', Validators.required),
    });
  }

  createOrder() {

    if (this.createOrderForm.valid) {
      let user = JSON.parse(localStorage.getItem("user"))
      const cartForOrder = Object.assign({ "total": this.cart.total, 'userId': user.id }, this.createOrderForm.value);

      this.orderServise.CreateOrder(localStorage.getItem('cartKey'), cartForOrder).subscribe((res: any) => {
        console.log(res);

      }, err => console.error(err),
        () => {
          if (this.saveCheckOutData == true) {
            const userForUpdate =
              Object.assign({
                'City': cartForOrder.City,
                'Address': cartForOrder.Address
              })
            this.user.updateUserData(userForUpdate).subscribe((res: any) => {
              user.city = res.userForUpdate.city
              user.address = res.userForUpdate.address
              localStorage.setItem('user', JSON.stringify(user))
            })
          }
        });

    }

  }
}
