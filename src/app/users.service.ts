import { Injectable } from '@angular/core';
import { UsersState } from './store/store';
import { Sitter } from './entities/sitter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Biker } from '../entities/biker';

@Injectable()
export class UsersService {

    constructor(private http: HttpClient) { }

    authenticate(authDetails) {
        console.log(authDetails)
        return this.http.post('/api/login', authDetails)
    }

    getAuthUser(userId) {
        return this.http.get('/api/user/' + userId)
    }

    getUsers() {
        return this.http.get('/api/users');
    }

    getConversations() {
        return this.http.get('/api/conversations/1')
    }

    addUser(user: Biker) {
        console.log("service: ", user)
        return this.http.post('/api/user', user)
    }

    updateUser(user: Biker, userId: number) {
        return this.http.post('/api/user/' + userId, user)
    }

    // deleteUser(id: String) {
    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json',
    //         })
    //     };
    //     return this.http.post('http://angular2api1.azurewebsites.net/api/internships/delete/'+id, httpOptions)
    // }

    static getInitialUsersState(): UsersState {
        return { auth: null, profiles: [], conversations: [] };
    }
}