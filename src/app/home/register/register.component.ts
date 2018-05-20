import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from '../../PasswordValidator';
import { NgRedux } from '@angular-redux/store';
import { UsersActions } from '../../users.actions';
import { IAppState } from '../../store/store';
import { UsersService } from '../../users.service';
import { Biker } from '../../../entities/biker';
import { SignupService } from '../../signup.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnDestroy {
	registerForm: FormGroup;
	subscription: Subscription;
	areas = [];
	requestStatus;
	statusMessage;

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	constructor(private fb: FormBuilder, private router: Router,
		private usersActions: UsersActions, private ngRedux: NgRedux<IAppState>,
		private usersService: UsersService, private signupService: SignupService) {
	}

	onSubmit(registerForm) {
		let user: Biker = registerForm.value as Biker;

		console.log(registerForm.controls.password.errors)
		console.log(registerForm.controls.confirmPassword.errors)
		if (registerForm.valid) {
			this.signupService.registerUser(user)
				.subscribe(data => {
					this.requestStatus = data;
					if (this.requestStatus && this.requestStatus.status == "ERROR") {
						this.statusMessage = this.requestStatus && this.requestStatus.message;
					} else {
						this.router.navigate(['home/confirm-account'])
					}
				});
		}
	}

	ngOnInit() {
		this.subscription = this.ngRedux.select(state => state.static).subscribe(staticData => {
			this.areas = staticData.areas
		});

		this.registerForm = this.fb.group({
			username: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(25)
			]), this.validateUsernameNotTaken.bind(this)],
			area: ['', Validators.required],
			password: ['', Validators.compose([
				Validators.required,
				PasswordValidator.getPasswordValidator()
			])],
			confirmPassword: ['', Validators.required],
			email: ['', Validators.compose([
				Validators.required,
				Validators.email
			]), this.validateEmailNotTaken.bind(this)],
			phone: ['', Validators.required],
			firstname: ['', [Validators.required, Validators.maxLength(30)]],
			lastname: ['', [Validators.required, Validators.maxLength(40)]],
		}, {
			validator: PasswordValidator.getMatchPassword
		});

	}

	validateEmailNotTaken(control: AbstractControl) {
		return this.signupService.checkEmailNotTaken(control.value).map(res => {
			return res ? null : { emailTaken: true };
		});
	}

	validateUsernameNotTaken(control: AbstractControl) {
		return this.signupService.checkUsernameNotTaken(control.value).map(res => {
			return res ? null : { usernameTaken: true };
		});
	}

}
