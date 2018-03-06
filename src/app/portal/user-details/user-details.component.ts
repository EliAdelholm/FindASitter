import { Component, OnInit, Input } from '@angular/core';
import { Baby } from '../../entities/baby';
import { DataService } from '../../data.service';
import { ActivatedRoute } from '@angular/router';
import { Sitter } from '../../entities/sitter';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
	@Input() baby: Baby;
	@Input() sitter: Sitter;

	constructor(private route: ActivatedRoute, private data: DataService) { }

	ngOnInit() {
		const userType = this.route.snapshot.paramMap.get('type');
		if (userType === "baby") {
			this.getBaby()
		} else {
			this.getSitter()
		}
	}

	getBaby(): void {
		const id = this.route.snapshot.paramMap.get('id');
		this.data.getBaby(id)
			.subscribe(baby => this.baby = baby);
		console.log(this.baby)
	}

	getSitter(): void {
		const id = this.route.snapshot.paramMap.get('id');
		this.data.getSitter(id)
			.subscribe(sitter => this.sitter = sitter);
		console.log(this.sitter)
	}

}
