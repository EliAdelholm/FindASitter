import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

@Injectable()
export class SignupService {
    constructor(private http: HttpClient) { }

    checkEmailNotTaken(email: string) {
        return this.http.get('/api/lookup-email/' + email).delay(1000)
        // console.log("test: ", check)
            // .map(users => users.filter(user => user.email === email))
            // .map(users => !users.length);
            // return check;
    }
}