import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
	selector: 'app-babies-list',
	templateUrl: './babies-list.component.html',
	styleUrls: ['./babies-list.component.scss']
})
export class BabiesListComponent implements OnInit {
	babies = this.data.babies;
	sitters = this.data.sitters;

	constructor(private data: DataService) { }

	ngOnInit() {
	}

}
