import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PasswordValidator } from '../../PasswordValidator';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';
import { Biker } from '../../../entities/biker';
import { UsersActions } from '../../users.actions';
import { StaticActions } from '../../static.actions';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
	activeView;
	updateForm: FormGroup;
	uploadForm: FormGroup;
	staticSubscription;
	userSubscription;
	user: Biker;
	areas = [];
	licences = [];

	constructor(private fb: FormBuilder, private ngRedux: NgRedux<IAppState>,
		private usersActions: UsersActions, private staticActions: StaticActions, private cd: ChangeDetectorRef) { }

	onSubmit(updateForm) {
		let user: Biker = updateForm.value as Biker;

		if (updateForm.valid) {
			this.usersActions.updateUser(user, this.user.id)
		}
	}

	changeView(view) {
		this.staticActions.updateProfileView(view);
	}

	previewImage(event) {
		let reader = new FileReader();

		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.uploadForm.patchValue({
					image: reader.result.split(',')[1],
					extension: file.name.split('.')[1]
				});

				// need to run CD since file load runs outside of zone
				this.cd.markForCheck();
			};
		}
	}

	onUpload(uploadForm) {
		let image = uploadForm.value;

		if (uploadForm.valid) {
			this.usersActions.updateImage(image, this.user.id)
		}
	}

	ngOnInit() {
		this.staticSubscription = this.ngRedux.select(state => state.static).subscribe(staticData => {
			this.areas = staticData.areas;
			this.licences = staticData.licences;
			this.activeView = staticData.profileView;
		});

		this.userSubscription = this.ngRedux.select(state => state.users).subscribe(users => {
			this.user = users.auth
			console.log(this.user)
		});

		this.updateForm = this.fb.group({
			username: [this.user && this.user.username, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
			area: [this.user && this.user.areaId, Validators.required],
			email: [this.user && this.user.email, Validators.compose([
				Validators.required,
				Validators.email
			])],
			phone: [this.user && this.user.phone, Validators.required],
			firstname: [this.user && this.user.firstname, [Validators.required, Validators.maxLength(30)]],
			lastname: [this.user && this.user.lastname, [Validators.required, Validators.maxLength(40)]],
			birthdate: [this.user && this.user.birthdate],
			licence: [this.user && this.user.licence]
		});

		this.uploadForm = this.fb.group({
			image: [null, [Validators.required]],
			extension: [null]
		})
	}

	deleteAccount() {
		this.usersActions.deleteUser(this.user.id)
	}

}
