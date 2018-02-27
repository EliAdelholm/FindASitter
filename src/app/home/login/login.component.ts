import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { PasswordValidator } from '../../PasswordValidator';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
	}

	onSubmit(loginForm) {
		console.log("is Valid?: " + loginForm.valid);

		if (loginForm.valid) {

			// Navigate to some page
			this.authService.login().subscribe(x => {

				// If a redictUrl is specified go there and then clear the slate
				if (this.authService.redirectUrl) {
					this.router.navigate([this.authService.redirectUrl])
					this.authService.redirectUrl = null
				} else {
					// Else just go to the overview page
					this.router.navigate(['portal'])
				}
			})

		}
	}

	ngOnInit() {
		this.loginForm = this.fb.group({
			username: ['', Validators.required],
			password: ['',
				Validators.compose([
					Validators.required,
					PasswordValidator.getPasswordValidator()
				]
				)]
		});
	}

}
