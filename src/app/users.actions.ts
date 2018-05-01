import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store/store';
import { Baby } from './entities/baby';

@Injectable()
export class UsersActions {

    constructor( private ngRedux: NgRedux<IAppState> ) { 

    }
    
    // Available actions
    static AUTHENTICATE: string = 'AUTHENTICATE';
    static RECEIVED_AUTHENTICATE: string = 'RECEIVED_AUTHENTICATE';
    static FAILED_RECEIVED_AUTHENTICATE: string = 'FAILED_RECEIVED_AUTHENTICATE';

     // Available actions
     static GET_AUTH_USER: string = 'GET_AUTH_USER';
     static RECEIVED_AUTH_USER: string = 'RECEIVED_AUTH_USER';
     static FAILED_RECEIVED_AUTH_USER: string = 'FAILED_RECEIVED_AUTH_USER';

    static GET_USERS: string = 'GET_USERS';
    static RECEIVED_USERS: string = 'RECEIVED_USERS';
    static FAILED_RECEIVED_USERS: string = 'FAILED_RECEIVED_USERS';

    static GET_CONVERSATIONS: string = 'GET_CONVERSATIONS';
    static RECEIVED_CONVERSATIONS: string = 'RECEIVED_CONVERSATIONS';
    static FAILED_RECEIVED_CONVERSATIONS: string = 'FAILED_RECEIVED_CONVERSATIONS';

    static ADD_USER: string = 'ADD_USER';
    static ADDED_USER: string = 'ADDED_USER';
    static FAILED_ADDED_USER: string = 'FAILED_ADDED_USER';

    static UPDATE_USER: string = 'UPDATE_USER';
    static UPDATED_USER: string = 'UPDATED_USER';
    static FAILED_UPDATED_USER: string = 'FAILED_UPDATED_USER';

    static DELETE_USER: string = 'DELETE_USER';
    static DELETED_USER: string = 'DELETED_USER';
    static FAILED_DELETED_USER: string = 'FAILED_DELETED_USER';

    authenticate(authDetails: {}) {
        this.ngRedux.dispatch({
            type: UsersActions.AUTHENTICATE,
            payload: authDetails
        })
    }

    getAuthUser(userId: number) {
        this.ngRedux.dispatch({
            type: UsersActions.GET_AUTH_USER,
            payload: userId
        })
    }

    getUsers() {
        this.ngRedux.dispatch({
            type: UsersActions.GET_USERS
        })
    }

    getConversations() {
        this.ngRedux.dispatch({
            type: UsersActions.GET_CONVERSATIONS
        })
    }

    addUser(user: {}): void {
        this.ngRedux.dispatch({
            type: UsersActions.ADD_USER,
            payload: user
        })
    }

    updateUser(user: {}, userId: number): void {
        this.ngRedux.dispatch({
            type: UsersActions.UPDATE_USER,
            payload: {user, userId}
        })
    }

    deleteUser(userId: string): void {
        this.ngRedux.dispatch({
            type: UsersActions.DELETE_USER,
            payload: userId
        })
    }

}
