import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Baby } from '../../entities/baby';
import { DataService } from '../../data.service';
import { ActivatedRoute } from '@angular/router';
import { Sitter } from '../../entities/sitter';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '../../PasswordValidator';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
	// @Input() baby: Baby;
	@Input() userInput: Sitter;
	@Output() userClick = new EventEmitter<any>();
	private updateUserForm: FormGroup;

	constructor(private fb: FormBuilder, private data: DataService) {
		
	}

	onSubmit(updateUserForm) {
		let baby: Baby = updateUserForm.value as Baby;

		console.log(updateUserForm.value)

		// if (registerBabyForm.valid) {
		// 	this.data.addBaby(baby)
		// 	this.router.navigate(['portal/overview'])
		// 	console.log("valid")
		// } else {
		// 	console.log("Not")
		// }
	}

	ngOnInit() {
		this.updateUserForm = this.fb.group({
			username: [this.userInput.username, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
			area: [this.userInput.area, Validators.required],
			firstname: [this.userInput.firstname, [Validators.required, Validators.maxLength(30)]],
			lastname: [this.userInput.lastname, [Validators.required, Validators.maxLength(40)]],
			birthdate: [this.userInput.birthDate, Validators.required],
			gender: [this.userInput.gender, Validators.required],
		});
	}

	onUserClick() {
		this.userClick.emit(this.userInput);
	}


}
