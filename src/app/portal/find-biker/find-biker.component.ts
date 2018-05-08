import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';
import { Subscription } from 'rxjs/Subscription';
import { UsersActions } from '../../users.actions';
import { Biker } from '../../../entities/biker';

@Component({
	selector: 'app-find-biker',
	templateUrl: './find-biker.component.html',
	styleUrls: ['./find-biker.component.scss']
})
export class FindBikerComponent implements OnInit, OnDestroy {
	subscription: Subscription;
	staticSubscription: Subscription;
	filterArea: number;
	users: Biker[];
	filteredUsers: Biker[];
	areas = [{ id: 0, name: "All areas" }];
	licences = [];

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
		this.staticSubscription.unsubscribe();
	}

	constructor(private ngRedux: NgRedux<IAppState>, private usersActions: UsersActions) { }

	onChangeArea() {
		if (this.filterArea === 0) {
			this.filteredUsers = this.users;
		} else {
			this.filteredUsers = this.users.filter(user => user.areaId == this.filterArea)
		}
	}

	calculateAverage(MyData) { 
		var sum = 0; 
		for(var i = 0; i < MyData.length; i++){
			sum += parseInt(MyData[i].rating, 10); //don't forget to add the base 
		}
	
		var avg = sum/MyData.length;
	
		return avg; 
	};

	ngOnInit() {
		this.subscription = this.ngRedux.select(state => state.users).subscribe(users => {
			this.users = users.profiles;
			this.filterArea = users.auth && users.auth.areaId;

			this.filteredUsers = users.profiles.filter(user => user.areaId == users.auth.areaId);
		});

		this.staticSubscription = this.ngRedux.select(state => state.static).subscribe(staticData => {
			this.areas = this.areas.concat(staticData.areas);
			this.licences = staticData.licences;
		})

	}

}
