// import { Injectable } from '@angular/core';
// import { Baby } from './entities/baby';
// import { Sitter } from './entities/sitter';
// import { Observable } from 'rxjs/Observable';
// import { of } from 'rxjs/observable/of';
// import { Router } from '@angular/router';

// @Injectable()
// export class DataService {

// 	// Call to webservice to get data
// 	// Dummy data for now
// 	babies: Baby[] = [
// 		{ username: "oli", firstname: "Oliver", lastname: "Kirschberg", birthDate: new Date(2017, 5, 17), area: "Greater Copenhagen", rating: [], gender: "Male" },
// 		{ username: "elin", firstname: "Elin", lastname: "Skuladottir", birthDate: new Date(2012, 8, 18), area: "Greater Copenhagen", rating: [], gender: "Female" }
// 	];

// 	sitters: Sitter[] = [
// 		{ username: "death-metal", firstname: "Christian", lastname: "Kirschberg", birthDate: new Date(1979, 1, 1), area: "Greater Copenhagen", rating: [], gender: "Male", rate: 120, workAreas: ['Greater Copenhagen', 'Sealand'] },
// 		{ username: "EliA", firstname: "Eli", lastname: "Adelholm", birthDate: new Date(1993, 4, 8), area: "Greater Copenhagen", rating: [], gender: "Female", rate: 150, workAreas: ['Greater Copenhagen', 'Sealand'] },
// 	];



// 	constructor(private router: Router) { }

// 	public addBaby(baby: Baby) {
// 		this.babies.push(baby)

// 		console.log(this.babies)
// 	}

// 	public deleteBaby(username) {
// 		let index = this.babies.findIndex(x => x.username == username);
// 		this.babies.splice(index, 1)

// 		console.log(this.babies)
// 		this.router.navigate(['portal/babies-list'])
// 	}

// 	getBaby(id: string): Observable<Baby> {
// 		return of(this.babies.find(baby => baby.username === id));
// 	}

// 	public addSitter(sitter: Sitter) {
// 		this.sitters.push(sitter)
// 	}

// 	getSitter(id: string): Observable<Sitter> {
// 		return of(this.sitters.find(sitter => sitter.username === id));
// 	}

// 	public deleteSitter(username) {
// 		let index = this.sitters.findIndex(x => x.username == username);
// 		this.sitters.splice(index, 1)

// 		console.log(this.sitters)
// 		this.router.navigate(['portal/babies-list'])
// 	}

// }
