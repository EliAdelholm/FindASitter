import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { Baby } from '../../entities/baby';
import { PasswordValidator } from '../../PasswordValidator';

@Component({
	selector: 'register-baby',
	templateUrl: './register-baby.component.html',
	styleUrls: ['./register-baby.component.scss']
})

export class RegisterBabyComponent implements OnInit {
	private registerBabyForm: FormGroup;

	constructor(private fb: FormBuilder, private data: DataService, private router: Router) {
		
	}

	onSubmit(registerBabyForm) {
		let baby: Baby = registerBabyForm.value as Baby;

		console.log(registerBabyForm.value)

		if (registerBabyForm.valid) {
			this.data.addBaby(baby)
			this.router.navigate(['portal/overview'])
			console.log("valid")
		} else {
			console.log("Not")
		}
	}

	ngOnInit() {
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
