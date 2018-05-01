import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UsersActions } from '../users.actions';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(private auth: AuthService, private router: Router, private userActions: UsersActions) { }

	ngOnInit() {
		// If the user is already logged in go to portal
		if (this.auth.isAuthenticated()) {
			this.router.navigate(['portal'])
		}
	}

}
