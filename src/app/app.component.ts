import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { UsersActions } from './users.actions';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'FindASitter';
	constructor(private usersService: UsersService, private usersActions: UsersActions) {}

	ngOnInit(): void {
		this.usersActions.getUsers();
	}
}
