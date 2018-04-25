import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Baby } from '../../entities/baby';
import { PasswordValidator } from '../../PasswordValidator';
import { NgRedux } from '@angular-redux/store';
import { UsersActions } from '../../users.actions';
import { IAppState } from '../../store/store';
import { Sitter } from '../../entities/sitter';
import { UsersService } from '../../users.service';
import { Person } from '../../entities/person';

@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
	registerForm: FormGroup;
	private isBaby: boolean;

	constructor(private fb: FormBuilder, private router: Router,
		private usersActions: UsersActions, private ngRedux: NgRedux<IAppState>, private usersService: UsersService) {

	}

	onSubmit(registerForm) {
		let user: Person = registerForm.value as Person;
		user.userType = this.isBaby ? 'baby' : 'sitter';

		if (registerForm.valid) {
			this.usersActions.addUser(user)
			this.router.navigate(['portal/overview'])
		}
	}

	ngOnInit() {

		this.registerForm = this.fb.group({
			userType: [''],
			username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
			area: ['', Validators.required],
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
