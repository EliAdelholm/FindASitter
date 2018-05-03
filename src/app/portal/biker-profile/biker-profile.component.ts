import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';
import { ActivatedRoute } from '@angular/router';
import { Biker } from '../../../entities/biker';
import { MomentModule } from 'angular2-moment';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-biker-profile',
	templateUrl: './biker-profile.component.html',
	styleUrls: ['./biker-profile.component.scss']
})

export class BikerProfileComponent implements OnInit {
	username: String = this.route.snapshot.params.username;
	subscription: Subscription;
	user = {};

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	constructor(private route: ActivatedRoute, private ngRedux: NgRedux<IAppState>) { }

	ngOnInit() {
		// console.log(MomentModule)
		this.subscription = this.ngRedux.select(state => state.users).subscribe(users => {
			this.user = users.profiles.find(profile => profile.username === this.username)
		});
	}

}
