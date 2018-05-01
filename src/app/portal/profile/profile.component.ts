import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PasswordValidator } from '../../PasswordValidator';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';
import { Biker } from '../../../entities/biker';
import { UsersActions } from '../../users.actions';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
	updateForm: FormGroup;
	staticSubscription;
	userSubscription;
	user;
	areas = [];
	licences = [];

	constructor(private fb: FormBuilder, private ngRedux: NgRedux<IAppState>, private usersActions: UsersActions) { }

	onSubmit(updateForm) {
		let user: Biker = updateForm.value as Biker;

		if (updateForm.valid) {
			this.usersActions.updateUser(user, this.user.id)
		}
	}

	ngOnInit() {
		this.staticSubscription = this.ngRedux.select(state => state.static).subscribe(staticData => {
			this.areas = staticData.areas;
			this.licences = staticData.licences;
		});

		this.userSubscription = this.ngRedux.select(state => state.users).subscribe(users => {
			this.user = users.auth
			console.log(this.user)
		});

		this.updateForm = this.fb.group({
			username: [this.user.username, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
			area: [this.user.areaId, Validators.required],
			email: [this.user.email, Validators.compose([
				Validators.required,
				Validators.email
			])],
			phone: [this.user.phone, Validators.required],
			firstname: [this.user.firstname, [Validators.required, Validators.maxLength(30)]],
			lastname: [this.user.lastname, [Validators.required, Validators.maxLength(40)]],
			birthdate: [this.user.birthdate],
			licence: [this.user.licence]
		});
	}

}
