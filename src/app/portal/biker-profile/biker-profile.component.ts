import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';
import { ActivatedRoute } from '@angular/router';
import { Biker } from '../../../entities/biker';
import { MomentModule } from 'angular2-moment';
import { Subscription } from 'rxjs/Subscription';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersActions } from '../../users.actions';

@Component({
	selector: 'app-biker-profile',
	templateUrl: './biker-profile.component.html',
	styleUrls: ['./biker-profile.component.scss']
})

export class BikerProfileComponent implements OnInit {
	username: String = this.route.snapshot.params.username;
	subscription: Subscription;
	auth: Biker;
	user: Biker;
	users: Biker[];
	ratings;
	ratingForm: FormGroup;
	ratingView = "latest";

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	constructor(private fb: FormBuilder, private route: ActivatedRoute, private ngRedux: NgRedux<IAppState>, private usersActions: UsersActions) { }

	onSubmit(ratingForm) {
		if (ratingForm.valid) {
			this.usersActions.addRating(ratingForm.value, this.user.id)
		}
	}

	ngOnInit() {
		this.subscription = this.ngRedux.select(state => state.users).subscribe(users => {
			this.user = users.profiles.find(profile => profile.username === this.username)
			this.auth = users.auth
			this.users = users.profiles

			if (this.user && this.users) {
				let ratings = this.user.ratings;

				for (let i = 0; i < ratings.length; i++) {
					ratings[i].user = this.findUser(ratings[i].userId);
				}
				this.ratings = ratings;
			}

			this.ratingForm = this.fb.group({
				userId: [this.auth && this.auth.id, Validators.required],
				rating: ['', Validators.required],
				message: ['', Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(140)
				])]
			});

			if(users.ratingMessage == "OK") {
				this.ratingView = "latest"
			}
		});
	}

	findUser(userId) {
		let user = this.users.find(user => user.id === userId);
		if (user) {
			return user;
		}
		return { username: "Deleted user", image: "deleted-user.png" }
	}

	calculateAverage(MyData) {
		var sum = 0;
		for (var i = 0; i < MyData.length; i++) {
			sum += parseInt(MyData[i].rating, 10); //don't forget to add the base 
		}

		var avg = sum / MyData.length;

		return avg;
	};

}
