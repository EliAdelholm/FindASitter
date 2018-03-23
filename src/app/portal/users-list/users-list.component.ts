import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {
	babies = [];
	sitters = [];

	constructor(private data: DataService, private ngRedux: NgRedux<IAppState>) { }

	ngOnInit() {
		this.ngRedux.select(state => state.users).subscribe(users => {
			this.babies = users.babies;
			this.sitters = users.sitters;
		});
	}

	onUserClicked(user) {
		console.log(user)
	}

}
