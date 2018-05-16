import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from '../../signup.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-confirm-account',
	templateUrl: './confirm-account.component.html',
	styleUrls: ['./confirm-account.component.scss']
})

export class ConfirmAccountComponent implements OnInit {
	tokenForm: FormGroup;
	requestStatus;
	statusMessage;

	constructor(private fb: FormBuilder, private signupService: SignupService, private router: Router) { }

	ngOnInit() {
		this.tokenForm = this.fb.group({
			token: ['', Validators.required],
		});
	}

	onSubmit(tokenForm) {
		let token = tokenForm.value.token;

		if (tokenForm.valid) {
			this.signupService.confirmAccount(token)
				.subscribe(data => {
					this.requestStatus = data;
					if (this.requestStatus && this.requestStatus.status == 'ERROR') {
						this.statusMessage = this.requestStatus && this.requestStatus.message;
					} else {
						this.router.navigate(['home/login'])
					}
				});
		}
	}
}
