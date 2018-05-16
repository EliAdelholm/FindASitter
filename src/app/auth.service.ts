import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

	constructor(public jwtHelper: JwtHelperService) { }

	public isAuthenticated(): boolean {

		const token = localStorage.getItem('APIToken');

		if (token) {
			// Check whether the token is expired
			return !this.jwtHelper.isTokenExpired(token);
		}

		return false;
	}

	public authenticatedUserId(): number {
		const token = localStorage.getItem('APIToken');
		const decodedToken = this.jwtHelper.decodeToken(token);
		console.log(decodedToken.user.id)
		return decodedToken.user.id;
	}
}