import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Baby } from '../../entities/baby';
import { PasswordValidator } from '../../PasswordValidator';
import { NgRedux } from '@angular-redux/store';
import { UsersActions } from '../../users.actions';
import { IAppState } from '../../store/store';
import { Sitter } from '../../entities/sitter';

@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
	private registerForm: FormGroup;
	private isBaby: boolean;

	constructor(private fb: FormBuilder, private router: Router, 
		private usersActions: UsersActions, private ngRedux: NgRedux<IAppState>) {

	}

	onSubmit(registerForm) {
		if(this.isBaby) {
			let baby: Baby = registerForm.value as Baby;

			if (registerForm.valid) {
				this.usersActions.addBaby(baby)
				this.router.navigate(['portal/overview'])
				
			}
		} else {
			let sitter: Sitter = registerForm.value as Sitter;

			if (registerForm.valid) {
				this.usersActions.addSitter(sitter)
				this.router.navigate(['portal/overview'])
				
			}
		}
	}

	ngOnInit() {
		this.ngRedux.select(state => state.users).subscribe(users => {
			this.isBaby = users.isBaby;
		});

		this.registerForm = this.fb.group({
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
		});
	}

}
