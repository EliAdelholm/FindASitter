import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '../../PasswordValidator';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';
import { UsersActions } from '../../users.actions';
import { Person } from '../../entities/person';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
	subscription;
	user;
	userType: String = this.route.snapshot.params.type
	username: String = this.route.snapshot.params.id;
	private updateUserForm: FormGroup;

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	constructor(private fb: FormBuilder, private route: ActivatedRoute, 
		private ngRedux: NgRedux<IAppState>, private usersActions: UsersActions) {

	}

	onSubmit(updateUserForm) {
		// let user: Baby = updateUserForm.value as Baby;

		// console.log(updateUserForm.value)

	}

	ngOnInit() {
		// this.subscription = this.ngRedux.select(state => state.users).subscribe(users => {
		// 	if (this.userType == 'baby') {
		// 		this.user = users.babies.find(baby => baby.username === this.username)
		// 	} else {
		// 		this.user = users.sitters.find(sitter => sitter.username === this.username)
		// 		console.log(users.sitters.find(sitter => sitter.username === this.username))
		// 	}
		// });

		console.log(this.user)

		this.updateUserForm = this.fb.group({
			userType: [this.user.userType],
			username: [this.user.username, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
			area: [this.user.area, Validators.required],
			password: ['', Validators.compose([
				Validators.required,
				PasswordValidator.getPasswordValidator()
			])],
			repeat: ['', Validators.required],
			firstname: ['', [Validators.required, Validators.maxLength(30)]],
			lastname: ['', [Validators.required, Validators.maxLength(40)]],
			birthdate: ['', Validators.required],
			gender: ['', Validators.required],
			rating: [[]]
		});
	}

}
