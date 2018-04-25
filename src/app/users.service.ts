import { Injectable } from '@angular/core';
import { UsersState } from './store/store';
import { Sitter } from './entities/sitter';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from './entities/person';

@Injectable()
export class UsersService {

    constructor(private http: HttpClient) { }

    getUsers() {
        return this.http.get('http://localhost:3333/api/users');
    }

    getConversations() {
        return this.http.get('http://localhost:3333/api/conversations/1')
    }

    // addUser(user: Person) {
    //     console.log("service: ", user)
    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json',
    //         })
    //     };
    //     user.dataOwner = "Eli";
    //     return this.http.post('http://angular2api2.azurewebsites.net/api/internships', user, httpOptions)
    // }

    // updateUser(user: Person, id: String) {
    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json',
    //         })
    //     };

    //     user.dataOwner = "Eli";
    //     return this.http.put('http://angular2api2.azurewebsites.net/api/internships/'+id, user, httpOptions)
    // }

    // deleteUser(id: String) {
    //     const httpOptions = {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json',
    //         })
    //     };
    //     return this.http.post('http://angular2api1.azurewebsites.net/api/internships/delete/'+id, httpOptions)
    // }

    static getInitialUsersState(): UsersState {
        return { profiles: [], conversations: [] };
    }
}