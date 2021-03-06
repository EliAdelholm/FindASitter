import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

	constructor(public auth: AuthService, public router: Router) { }

	canActivate(): boolean {
		if (!this.auth.isAuthenticated()) {
			console.log("I am not authenticated")
			this.router.navigate(['/home']);
			return false;
		}
		return true;
	}

	canActivateChild(): boolean {
		if (!this.auth.isAuthenticated()) {
			console.log("I am not authenticated")
			this.router.navigate(['/home']);
			return false;
		}
		return true;
	}

}