import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

@Injectable()
export class BikeService {

    makeUrl: string
    modelUrl: string
    bikeUrl: string
    constructor(private http : HttpClient){
        this.makeUrl  = '/api/motorcycle-makes/';
        this.modelUrl = '/api/motorcycle-models/';
        this.bikeUrl = '/api/bike'
    }

    searchMake(make){
        return this.http.get(this.makeUrl + make)
    }

    searchModel(make, model) {
        return this.http.get(this.modelUrl + make + '/' + model)
    }

    addBike(bike) {
        console.log(bike)
        return this.http.post(this.bikeUrl, bike)
    }
}