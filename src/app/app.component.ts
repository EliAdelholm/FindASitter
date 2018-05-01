import { Component, OnInit } from '@angular/core';
import { StaticActions } from './static.actions';
import { AuthService } from './auth.service';
import { UsersActions } from './users.actions';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'FindASitter';

	constructor(private staticActions: StaticActions, private usersActions: UsersActions, private auth: AuthService) { }

	ngOnInit(): void {
		this.staticActions.getAreas();
		this.staticActions.getLicences();

		if (this.auth.isAuthenticated()) {
			this.usersActions.getAuthUser(this.auth.authenticatedUserId())
		}
	}
}
