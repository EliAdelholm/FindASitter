import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'register-baby',
  templateUrl: './register-baby.component.html',
  styleUrls: ['./register-baby.component.scss']
})

export class RegisterBabyComponent implements OnInit {
  registerBabyForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.registerBabyForm = this.fb.group({
			firstname: ['', Validators.required],
			lastname: ['', Validators.required],
			age: ['', Validators.required],
			gender: ['', Validators.required],
			area: ['', Validators.required],
		});
	}

	onSubmit(registerBabyForm) {
		console.log(registerBabyForm.value)

		if (registerBabyForm.valid) {
			console.log("valid")
		} else {
			console.log("Not")
		}
	}

  ngOnInit() {
  }

}
