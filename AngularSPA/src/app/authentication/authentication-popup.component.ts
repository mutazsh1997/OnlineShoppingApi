import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { AuthenticatonService } from '../services/authenticaton.service';
import { CartService } from '../services/cart.service';
import { hasRoleDirective } from '../shared/hasRole.directive';

@Component({
  selector: 'app-authentication-popup',
  templateUrl: './authentication-popup.component.html',
  styleUrls: ['./authentication-popup.component.scss']
})
export class AuthenticationPopupComponent implements OnInit {

  @Output() authentications = new EventEmitter<boolean>();
  @Input() authMode = "login";

  constructor(private router: Router
  ) { }

  ngOnInit(): void {
  }

  closePopup() {
    this.authentications.emit()
  }

}
