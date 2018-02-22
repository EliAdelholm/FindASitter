import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sitter } from '../../entities/sitter';

@Component({
	selector: 'register-sitter',
	templateUrl: './register-sitter.component.html',
	styleUrls: ['./register-sitter.component.scss']
})

export class RegisterSitterComponent implements OnInit {
	private sitter: Sitter = new Sitter();
	registerSitterForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.registerSitterForm = this.fb.group({
			username: ['', [Validators.required, Validators.minLength(3)]],
			password: ['', [Validators.required, Validators.minLength(8)]],
			email: ['', [Validators.required, Validators.email]],
			firstname: ['', Validators.required],
			lastname: ['', Validators.required],
			age: ['', Validators.required],
			gender: ['', Validators.required],
			area: ['', Validators.required],
			rate: ['', Validators.required]
		});
	}

	onSubmit(registerSitterForm) {
		console.log(registerSitterForm.value)

		if (registerSitterForm.valid) {
			console.log("valid")
		} else {
			console.log("Not")
		}
	}

	ngOnInit() {
	}

}
