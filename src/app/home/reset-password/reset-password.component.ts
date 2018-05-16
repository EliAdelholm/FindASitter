import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersActions } from '../../users.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SignupService } from '../../signup.service';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
	token: string = this.route.snapshot.params.token;
	tokenStatus;
	tokenMessage;
	passwordForm: FormGroup;
	subscription: Subscription;
	statusMessage;

	constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient, private router: Router,
		private usersActions: UsersActions, private ngRedux: NgRedux<IAppState>, private signupService: SignupService) { }

	ngOnInit() {
		this.getTokenStatus()

		this.passwordForm = this.fb.group({
			newPassword: ['', Validators.required],
			confirmPassword: ['', Validators.required],
			token: [this.token, Validators.required]
		});
	}

	onSubmit(passwordForm) {
		let data = passwordForm.value;

		if (passwordForm.valid) {
			this.signupService.resetPassword(data)
				.subscribe(data => {
					this.statusMessage = data;

					if (this.statusMessage.status == 'OK') {
						console.log('redirect to login')
						this.router.navigate(['home/login'])
					}
				});
		}
	}


	getTokenStatus() {
		this.signupService.getTokenStatus(this.token)
			.subscribe(data => {
				this.tokenStatus = data;

				if (this.tokenStatus.status == 'ERROR') {
					this.tokenMessage = this.tokenStatus.message;
				}
				console.log(data)
			});
	}

}
