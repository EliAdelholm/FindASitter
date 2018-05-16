import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersActions } from '../../users.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';
import { SignupService } from '../../signup.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
	emailForm: FormGroup;
	subscription: Subscription;
	requestStatus;
	statusMessage;

	constructor(private fb: FormBuilder, private usersActions: UsersActions, private ngRedux: NgRedux<IAppState>,
	private signupService: SignupService) { }

	ngOnInit() {
		this.emailForm = this.fb.group({
			email: ['', Validators.required],
		});
	}

	onSubmit(emailForm) {
		let email = emailForm.value.email;

		if (emailForm.valid) {
			this.signupService.sendResetPasswordEmail(email)
				.subscribe(data => {
					this.requestStatus = data;
					this.statusMessage = this.requestStatus && this.requestStatus.message;
				});
		}
	}

}
