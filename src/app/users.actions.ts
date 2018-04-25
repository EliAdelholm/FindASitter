import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store/store';
import { Baby } from './entities/baby';

@Injectable()
export class UsersActions {

    constructor( private ngRedux: NgRedux<IAppState> ) { 

    }
    
    // Available actions
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

    static SET_TYPE: string = 'SET_TYPE';
    static ADD_BABY: string = 'ADD_BABY';
    static DELETE_BABY: string = 'DELETE_BABY';
    static ADD_SITTER: string = 'ADD_SITTER';
    static DELETE_SITTER: string = 'DELETE_SITTER';
    static RATE_BABY: string = 'RATE_BABY';

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
        console.log("action: ", user)
        this.ngRedux.dispatch({
            type: UsersActions.ADD_USER,
            payload: user
        })
    }

    deleteUser(userId: string): void {
        this.ngRedux.dispatch({
            type: UsersActions.DELETE_USER,
            payload: userId
        })
    }

    setType(isBaby: boolean): void {
        this.ngRedux.dispatch({
            type: UsersActions.SET_TYPE,
            payload: isBaby
        })
    }

    addBaby(baby: {}): void { 
        this.ngRedux.dispatch({
            type: UsersActions.ADD_BABY,
            payload: baby
        })
     };

     deleteBaby(babyId: string): void {
        this.ngRedux.dispatch({
            type: UsersActions.DELETE_BABY,
            payload: babyId
        })
     }

     addSitter(sitter: {}): void { 
        this.ngRedux.dispatch({
            type: UsersActions.ADD_SITTER,
            payload: sitter
        })
     }

     deleteSitter(sitterId: string): void {
        this.ngRedux.dispatch({
            type: UsersActions.DELETE_SITTER,
            payload: sitterId
        })
     }
}
