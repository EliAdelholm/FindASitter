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
        return this.http.get('/api/lookup-email/' + email).delay(500)
    }

    checkUsernameNotTaken(username: string) {
        return this.http.get('/api/lookup-username/' + username).delay(500)
    }

    registerUser(user: object) {
        return this.http.post('/api/user', user)
    }

    confirmAccount(token: object) {
        return this.http.get('/api/confirm-account/' + token)
    }

    sendResetPasswordEmail(email: string) {
        return this.http.get('/api/reset-password/' + email)
    }

    getTokenStatus(token: string) {
        return this.http.get('/api/lookup-token/' + token)
    }

    resetPassword(data: object) {
        return this.http.post('/api/reset-password', data)
    }
}