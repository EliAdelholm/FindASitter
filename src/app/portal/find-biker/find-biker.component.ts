import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';
import { Subscription } from 'rxjs/Subscription';
import { UsersActions } from '../../users.actions';

@Component({
	selector: 'app-find-biker',
	templateUrl: './find-biker.component.html',
	styleUrls: ['./find-biker.component.scss']
})
export class FindBikerComponent implements OnInit, OnDestroy {
	subscription;
	staticSubscription;
	users = [];
	areas = [];
	licences = [];

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	constructor(private ngRedux: NgRedux<IAppState>, private usersActions: UsersActions) { }

	ngOnInit() {
		this.subscription = this.ngRedux.select(state => state.users).subscribe(users => {
			this.users = users.profiles
		});

		this.staticSubscription = this.ngRedux.select(state => state.static).subscribe(staticData => {
			this.areas = staticData.areas;
			this.licences = staticData.licences;
		})

	}

}
