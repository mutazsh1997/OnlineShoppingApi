import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticatonService } from 'src/app/services/authenticaton.service';

@Component({
  selector: 'app-confirm-auth',
  templateUrl: './confirm-auth.component.html',
  styleUrls: ['./confirm-auth.component.scss']
})
export class ConfirmAuthComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute, private auth: AuthenticatonService) { }
  confirmationStatus = false;
  confiromObject: any = {};

  ngOnInit(): void {
    this.confiromObject = {
      "token": this.activateRoute.snapshot.queryParamMap.get('token'),
      "userId": this.activateRoute.snapshot.queryParamMap.get('userId')
    }
    this.auth.confiormEmail(this.confiromObject).subscribe(er => {
    }, (err) => {
      console.log(err);
      this.confirmationStatus = false
    }, () => {
      this.confirmationStatus = true;
    });
  }
  resendEmail() {
    this.auth.resendConfirmEmail(this.confiromObject.userId).subscribe();
  }
}
