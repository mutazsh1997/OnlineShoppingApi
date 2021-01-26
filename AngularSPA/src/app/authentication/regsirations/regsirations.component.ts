import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthenticatonService } from 'src/app/services/authenticaton.service';
import { CartService } from 'src/app/services/cart.service';
import { hasRoleDirective } from 'src/app/shared/hasRole.directive';

@Component({
  selector: 'app-regsirations',
  templateUrl: './regsirations.component.html',
  styleUrls: ['./regsirations.component.scss']
})
export class RegsirationsComponent implements OnInit {

  @Input() authMode = "login";
  @Output() authentications = new EventEmitter<boolean>();

  auth: User = {
    Email: null,
    userName: null,
    Password: null,
    confirmPassword: null,
    cartId: null,
  };
  AuthFalid = false;
  errMessage: string;

  mrTop: boolean = false;

  registerForm: FormGroup;

  constructor(private userAuthentication: AuthenticatonService,
    private cart: CartService,
    private router: Router,
  ) { }
  ngOnInit(): void {

    if (this.router.url == '/registration') {
      this.mrTop = true;
    }
    this.registerForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/),
      Validators.minLength(8), Validators.maxLength(34)]),
      confirmPassword: new FormControl('', Validators.required)
    }, this.passwordMatchValidator)
  }
  passwordMatchValidator(g: FormGroup) {
    return g.get('Password').value == g.get('confirmPassword').value ? null : { 'mismatch': true };
  }
  lowerCaseValid() {
    return /^(?=[^a-z]*[a-z])/.test(this.registerForm.get('Password').value);
  }
  upperCaseValid() {
    return /^(?=[^A-Z]*[A-Z])/.test(this.registerForm.get('Password').value);
  }
  numberCaseValid() {
    return /^(?=\D*\d)/.test(this.registerForm.get('Password').value);
  }


  onSubmitRegister() {
    if (this.registerForm.valid) {
      this.auth = {
        Email: this.registerForm.value.Email,
        userName: this.registerForm.value.userName,
        Password: this.registerForm.value.Password,
        cartId: localStorage.getItem("cartKey"),

      }
      this.userAuthentication.register(this.auth).subscribe(res => {

      }, err => {
        this.AuthFalid = true
        console.log(err);
        err.error.forEach(error => {
          this.errMessage = error.description;
        });
      },
        () => {
          this.router.navigate(['/']);
          this.authentications.emit();
        });
    }
  }

  onSubmitLogin(loginform: NgForm) {
    if (loginform.valid) {
      const userLogin = Object.assign({}, loginform.value);
      this.userAuthentication.login(userLogin).subscribe(() => {

      }, err => {
        if (err.error == "ConfirmEmail") {
          this.errMessage = 'you should confirm your account before login'
        }
        if (err.error == "incorrectPassword") {
          this.errMessage = 'your email or password incorrect'
        }
        if (err.error == "noAccountFound") {
          this.errMessage = 'there is no account with that Email please try to register'
        }
        this.AuthFalid = true
      },
        () => {

          this.router.navigate(['/']);
          this.authentications.emit()

          this.cart.getItemsInCart();
          this.cart.getCart();
          this.AuthFalid = false;
        });
    }
  }

}
