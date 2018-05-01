import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidator } from '../../PasswordValidator';
import { NgRedux } from '@angular-redux/store';
import { UsersActions } from '../../users.actions';
import { IAppState } from '../../store/store';
import { UsersService } from '../../users.service';
import { Biker } from '../../../entities/biker';
import { SignupService } from '../../signup.service';

@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	subscription;
	areas = [];

	constructor(private fb: FormBuilder, private router: Router,
		private usersActions: UsersActions, private ngRedux: NgRedux<IAppState>, 
		private usersService: UsersService, private signupService: SignupService) {
	}

	onSubmit(registerForm) {
		let user: Biker = registerForm.value as Biker;

		if (registerForm.valid) {
			this.usersActions.addUser(user)
			setTimeout(function() {
				this.router.navigate(['portal/profile'])
			}, 1000)
		}
	}

	ngOnInit() {
		this.subscription = this.ngRedux.select(state => state.static).subscribe(staticData => {
			this.areas = staticData.areas
		});

		this.registerForm = this.fb.group({
			username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
			area: ['', Validators.required],
			password: ['', Validators.compose([
				Validators.required,
				PasswordValidator.getPasswordValidator()
			])],
			repeat: ['', Validators.required],
			email: ['', Validators.compose([
				Validators.required,
				Validators.email
			]), this.validateEmailNotTaken.bind(this)],
			phone: ['', Validators.required],
			firstname: ['', [Validators.required, Validators.maxLength(30)]],
			lastname: ['', [Validators.required, Validators.maxLength(40)]],
		});

	}

	validateEmailNotTaken(control: AbstractControl) {
		return this.signupService.checkEmailNotTaken(control.value).map(res => {
			console.log(res)
			return res ? null : { emailTaken: true };
		});
	}

}
