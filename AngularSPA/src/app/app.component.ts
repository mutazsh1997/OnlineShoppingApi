import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from './models/User';
import { AuthenticatonService } from './services/authenticaton.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularSPA';

  constructor(private cartServise: CartService,
    private auth: AuthenticatonService,
    private router: Router) {

  }

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    const user: User = JSON.parse(localStorage.getItem('user'))
    if (localStorage.getItem('token')) {

      this.auth.decodedToken = this.auth.jwtHelper.decodeToken(localStorage.getItem('token'));
    }
    if (user) {
      this.auth.currentUser = user;
      localStorage.setItem("cartKey", user.cartId);
    } else {
      if (localStorage.getItem("cartKey") == null) {
        this.cartServise.getCartId().subscribe((res: string) => {
          localStorage.setItem("cartKey", res)
        }, err => {
          console.error(err);
        })
      }
    }
    this.cartServise.getItemsInCart();
  }
  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
}
