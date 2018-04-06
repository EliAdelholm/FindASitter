import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';
import { Subscription } from 'rxjs/Subscription';
import { UsersActions } from '../../users.actions';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit, OnDestroy {
	subscription;
	babies = [];
	sitters = [];

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	constructor(private ngRedux: NgRedux<IAppState>, private usersActions: UsersActions) { }

	ngOnInit() {
		this.subscription = this.ngRedux.select(state => state.users).subscribe(users => {
			this.babies = users.babies;
			this.sitters = users.sitters;
		});

		console.log(this.babies)
	}

	onUserClicked(user) {
		console.log(user)
	}

}
