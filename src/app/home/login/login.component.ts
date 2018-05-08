import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { PasswordValidator } from '../../PasswordValidator';
import { UsersActions } from '../../users.actions';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
	loginForm: FormGroup;
	subscription: Subscription;
	authMessage: string;

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, 
		private usersActions: UsersActions, private ngRedux: NgRedux<IAppState>) {
	}

	onSubmit(loginForm) {

		if (loginForm.valid) {
			this.usersActions.authenticate(loginForm.value);

			// this.authService.login().subscribe(x => {

			// 	// If a redictUrl is specified go there and then clear the slate
			// 	if (this.authService.redirectUrl) {
			// 		this.router.navigate([this.authService.redirectUrl])
			// 		this.authService.redirectUrl = null
			// 	} else {
			// 		// Else just go to the overview page
			// 		this.router.navigate(['portal'])
			// 	}
			// })

		}
	}

	ngOnInit() {
		this.subscription = this.ngRedux.select(state => state.users).subscribe(users => {
			this.authMessage = users.authMessage;

			if(this.authMessage == "OK") {
				this.router.navigate(['portal'])
			}
		});

		this.loginForm = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

}
