import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersActions } from '../users.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';
import { Biker } from '../../entities/biker';

@Component({
	selector: 'app-portal',
	templateUrl: './portal.component.html',
	styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
	subscription;
	user: Biker;

	constructor(private router: Router, private usersActions: UsersActions, private ngRedux: NgRedux<IAppState>) { }

	ngOnInit() {
		this.usersActions.getUsers();

		this.subscription = this.ngRedux.select(store => store.users).subscribe(users => {
			this.user = users.auth;
		})
	}

	logout() {
		localStorage.removeItem('APIToken');
		this.router.navigate(['home'])
	}

}
