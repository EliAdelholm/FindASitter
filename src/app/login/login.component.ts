import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	// Alternative to the constructor method
	/* loginForm = new FormGroup ({
		username: new FormControl(),
		password: new FormControl()
	}); */

	constructor(private fb: FormBuilder) {
		this.loginForm = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	onSubmit(loginForm) {
		console.log(loginForm.value)

		if (loginForm.valid) {
			console.log("valid")
		} else {
			console.log("Not")
		}
	}

	ngOnInit() {
	}

}
