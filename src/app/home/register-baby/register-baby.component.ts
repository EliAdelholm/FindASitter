import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { Baby } from '../../entities/baby';
import { PasswordValidator } from '../../PasswordValidator';
import { NgRedux } from '@angular-redux/store';
import { UsersActions } from '../../users.actions';
import { IAppState } from '../../store/store';

@Component({
	selector: 'register-baby',
	templateUrl: './register-baby.component.html',
	styleUrls: ['./register-baby.component.scss']
})

export class RegisterBabyComponent implements OnInit {
	private registerBabyForm: FormGroup;
	private isBaby: boolean;

	constructor(private fb: FormBuilder, private data: DataService, private router: Router, 
		private usersActions: UsersActions, private ngRedux: NgRedux<IAppState>) {

	}

	onSubmit(registerBabyForm) {
		let baby: Baby = registerBabyForm.value as Baby;

		// console.log(registerBabyForm.value)

		if (registerBabyForm.valid) {
			this.usersActions.addBaby(baby)
			// this.data.addBaby(baby)
			this.router.navigate(['portal/overview'])
			
		} else {
			
		}
	}

	ngOnInit() {
		this.ngRedux.select(state => state.users).subscribe(users => {
			this.isBaby = users.isBaby;
			console.log(this.isBaby)
		});

		this.registerBabyForm = this.fb.group({
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
