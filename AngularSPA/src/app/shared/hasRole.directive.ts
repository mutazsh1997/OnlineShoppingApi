import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticatonService } from '../services/authenticaton.service';

@Directive({
  selector: '[hasRole]'
})
export class hasRoleDirective implements OnInit {

  @Input() hasRole: string[];
  isVisible = false;

  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authServise: AuthenticatonService) {

  }

  ngOnInit() {
    if (this.authServise.loggedIn() == false) return;
    
    this.loadRole();
    const userRoles = this.authServise.decodedToken.role as Array<string>;

    //if no roles clear view container ref
    if (!userRoles) this.viewContainerRef.clear();

    if (this.authServise.RoleMatch(this.hasRole)) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }

    }
  }
  loadRole() {
     
  }
  updatedRole() {

    const userRoles = this.authServise.decodedToken.role as Array<string>;

    //if no roles clear view container ref
    if (!userRoles) this.viewContainerRef.clear();

    if (this.authServise.RoleMatch(this.hasRole)) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    }
  }
}
