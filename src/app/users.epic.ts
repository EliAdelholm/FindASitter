import { Injectable } from "@angular/core";
import { ActionsObservable } from "redux-observable";
import { Observable } from 'rxjs/Observable';
import { UsersService } from "./users.service";
import { UsersActions } from "./users.actions";
import'rxjs/add/observable/of';
import'rxjs/add/operator/mergeMap';
import'rxjs/add/operator/map';
import'rxjs/add/operator/catch';

@Injectable ()
export class UsersEpic {

    constructor(private usersService: UsersService) {}

    getUsers = (action$: ActionsObservable<any>) => {
        return action$.ofType(UsersActions.GET_USERS) 
            .mergeMap(({ payload }) => {
                return this.usersService.getUsers()
                    .map((result: any[]) => ({ 
                        type: UsersActions.RECEIVED_USERS,
                        payload: result
                    }))
                    .catch(error => Observable.of({
                        type: UsersActions.FAILED_RECEIVED_USERS,
                        payload: error
                    }));
            });
    }

    getConversations = (action$: ActionsObservable<any>) => {
        return action$.ofType(UsersActions.GET_CONVERSATIONS) 
            .mergeMap(({ payload }) => {
                return this.usersService.getConversations()
                    .map((result: any[]) => ({ 
                        type: UsersActions.RECEIVED_CONVERSATIONS,
                        payload: result
                    }))
                    .catch(error => Observable.of({
                        type: UsersActions.FAILED_RECEIVED_CONVERSATIONS,
                        payload: error
                    }));
            });
    }

    // addUser = (action$: ActionsObservable<any>) => {
    //     return action$.ofType(UsersActions.ADD_USER) 
    //         .mergeMap(({ payload }) => {
    //             console.log("epic: ", payload)
    //             return this.usersService.addUser(payload)
    //                 .map((result: any[]) => ({ 
    //                     type: UsersActions.ADDED_USER,
    //                     payload: result
    //                 }))
    //                 .catch(error => Observable.of({
    //                     type: UsersActions.FAILED_ADDED_USER,
    //                     payload: error
    //                 }));
    //         });
    // }

    // updateUser = (action$: ActionsObservable<any>) => {
    //     return action$.ofType(UsersActions.UPDATE_USER) 
    //         .mergeMap(({ payload }) => {
    //             console.log("epic: ", payload)
    //             return this.usersService.updateUser(payload.user, payload.id)
    //                 .map((result: any[]) => ({ 
    //                     type: UsersActions.UPDATED_USER,
    //                     payload: result.filter
    //                 }))
    //                 .catch(error => Observable.of({
    //                     type: UsersActions.FAILED_UPDATED_USER,
    //                     payload: error
    //                 }));
    //         });
    // }

    // deleteUser = (action$: ActionsObservable<any>) => {
    //     return action$.ofType(UsersActions.DELETE_USER) 
    //         .mergeMap(({ payload }) => {
    //             console.log("epic: ", payload)
    //             return this.usersService.deleteUser(payload)
    //                 .map(() => ({ 
    //                     type: UsersActions.DELETED_USER,
    //                     payload: payload
    //                 }))
    //                 .catch(error => Observable.of({
    //                     type: UsersActions.FAILED_DELETED_USER,
    //                     payload: error
    //                 }));
    //         });
    // }
}