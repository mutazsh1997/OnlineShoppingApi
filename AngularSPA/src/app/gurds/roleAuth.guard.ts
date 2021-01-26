import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticatonService } from '../services/authenticaton.service';

@Injectable({
    providedIn: 'root'
})
export class roleAuthGuard implements CanActivate {

    constructor(private auth: AuthenticatonService, private router: Router) {

    }
    canActivate(next: ActivatedRouteSnapshot): boolean {
        const roles = next.data['roles'] as Array<string>;
        if (roles) {
            const match = this.auth.RoleMatch(roles);

            if (match) {

                return true;
            } else this.router.navigate(['/']);
        }
        if (this.auth.loggedIn()) return true;

        this.router.navigate(['/']);
        return false;

    }

}