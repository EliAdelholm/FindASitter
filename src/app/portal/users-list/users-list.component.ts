import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
	babies = this.data.babies;
	sitters = this.data.sitters;

	constructor(private data: DataService) { }

	ngOnInit() {
	}

}
