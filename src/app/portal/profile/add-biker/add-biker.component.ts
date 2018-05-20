import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StaticActions } from '../../../static.actions';
import { Subscription } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../store/store';
import { BikeService } from '../../../bike.service';

@Component({
	selector: 'add-bike',
	templateUrl: './add-biker.component.html',
	styleUrls: ['./add-biker.component.scss']
})
export class AddBikerComponent implements OnInit {
	bikeForm: FormGroup;
	searchMake: FormControl = new FormControl('', Validators.required);
	searchModel: FormControl = new FormControl('', Validators.required);
	searchMakeResult;
	searchModelResult;
	previewImg;


	constructor(private fb: FormBuilder, private bikeService: BikeService, private cd: ChangeDetectorRef) {

		this.searchMake.valueChanges
			.subscribe(data => {
				this.bikeService.searchMake(data).subscribe(response => {
					console.log(response)
					this.searchMakeResult = response
				})
			})

			this.searchModel.valueChanges
			.subscribe(data => {
				let make = this.searchMake.value
				this.bikeService.searchModel(make, data).subscribe(response => {
					console.log(response)
					this.searchModelResult = response
				})
			})

	}

	ngOnInit() {

		this.bikeForm = this.fb.group({
			year: ['', Validators.required],
			image: ['', Validators.required],
			extension: ['', Validators.required]
		});
	}

	onSubmit(bikeForm) {
		bikeForm.value.make = this.searchMake.value;
		bikeForm.value.model = this.searchModel.value;
		
		if (bikeForm.valid) {
			console.log('add bike')
			this.bikeService.addBike(bikeForm.value).subscribe(data => {
				console.log(data)
			});
		}
	}

	previewImage(event) {
		let reader = new FileReader();

		if (event.target.files && event.target.files.length) {
			const [file] = event.target.files;
			reader.readAsDataURL(file);

			reader.onload = () => {
				this.previewImg = reader.result;
				this.bikeForm.patchValue({
					image: reader.result.split(',')[1],
					extension: file.name.split('.')[1]
				});

				// need to run CD since file load runs outside of zone
				this.cd.markForCheck();
			};
		}
	}

}
