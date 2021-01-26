import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { hasRoleDirective } from '../shared/hasRole.directive';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatonService {

  baseUrl = environment.apiUrl;
  decodedToken: any;
  currentUser: User;
  jwtHelper = new JwtHelperService();
  userName: string;
  confirmEmailUrl =  window.location.host + "/confirmAuth"
  headers = new HttpHeaders({
    "confirmEmailUrl": this.confirmEmailUrl
  })
  options = { headers: this.headers };

  constructor(private http: HttpClient) {
  }

  register(userInfo: User) {

    return this.http.post(`${this.baseUrl}auth/register`, userInfo, this.options)

  }

  login(userLogin: any) {
    return this.http.post(`${this.baseUrl}auth/login`, userLogin).pipe(
      map((res: any) => {
        const user = res;
        if (user) {

          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          localStorage.setItem('cartKey', user.user.cartId)
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.userName = this.decodedToken.unique_name;
          this.currentUser = user.user;
        }
      }));
  }
  loggedIn() {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }
  RoleMatch(allowedRoles: any[]): boolean {
    let isMatch = false;
    const userRole = this.decodedToken.role as Array<string>;
    allowedRoles.forEach(element => {
      if (userRole.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }
  updateUserData(userToUpdate) {
    return this.http.patch(`${this.baseUrl}user/${this.currentUser.id}`, userToUpdate)
  }
  confiormEmail(confirmModule) {
    return this.http.post(`${this.baseUrl}auth/confirmEmail`, confirmModule);
  }
  resendConfirmEmail(userId: string) {
    return this.http.post(`${this.baseUrl}auth/sendConfrimEmail/${userId}`, {}, this.options);
  }

}
