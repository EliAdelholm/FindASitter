import { Injectable } from "@angular/core";
import { ActionsObservable } from "redux-observable";
import { Observable } from 'rxjs/Observable';
import { UsersService } from "./users.service";
import { UsersActions } from "./users.actions";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UsersEpic {

    constructor(private usersService: UsersService) { }

    authenticate = (action$: ActionsObservable<any>) => {
        return action$.ofType(UsersActions.AUTHENTICATE)
            .mergeMap(({ payload }) => {
                return this.usersService.authenticate(payload)
                    .map((result: any[]) => ({
                        type: UsersActions.RECEIVED_AUTHENTICATE,
                        payload: result
                    }))
                    .catch(error => Observable.of({
                        type: UsersActions.FAILED_RECEIVED_AUTHENTICATE,
                        payload: error
                    }));
            });
    }

    getAuthUser = (action$: ActionsObservable<any>) => {
        return action$.ofType(UsersActions.GET_AUTH_USER)
            .mergeMap(({ payload }) => {
                return this.usersService.getAuthUser(payload)
                    .map((result: any[]) => ({
                        type: UsersActions.RECEIVED_AUTH_USER,
                        payload: result
                    }))
                    .catch(error => Observable.of({
                        type: UsersActions.FAILED_RECEIVED_AUTH_USER,
                        payload: error
                    }));
            });
    }

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

    getBikes = (action$: ActionsObservable<any>) => {
        return action$.ofType(UsersActions.GET_BIKES)
            .mergeMap(({ payload }) => {
                return this.usersService.getBikes(payload)
                    .map((result: any[]) => ({
                        type: UsersActions.RECEIVED_BIKES,
                        payload: result
                    }))
                    .catch(error => Observable.of({
                        type: UsersActions.FAILED_RECEIVED_BIKES,
                        payload: error
                    }));
            });
    }

    lookupConversation = (action$: ActionsObservable<any>) => {
        return action$.ofType(UsersActions.LOOKUP_CONVERSATION)
            .mergeMap(({ payload }) => {
                return this.usersService.lookupConversation(payload.user1, payload.user2)
                    .map((result: any[]) => ({
                        type: UsersActions.RECEIVED_LOOKUP_CONVERSATION,
                        payload: result
                    }))
                    .catch(error => Observable.of({
                        type: UsersActions.FAILED_RECEIVED_LOOKUP_CONVERSATION,
                        payload: error
                    }));
            });
    }

    addConversation = (action$: ActionsObservable<any>) => {
        return action$.ofType(UsersActions.ADD_CONVERSATION)
            .mergeMap(({ payload }) => {
                return this.usersService.addConversation(payload.user1, payload.user2)
                    .map((result: any[]) => ({
                        type: UsersActions.ADDED_CONVERSATION,
                        payload: result
                    }))
                    .catch(error => Observable.of({
                        type: UsersActions.FAILED_ADDED_CONVERSATION,
                        payload: error
                    }));
            });
    }

    getConversations = (action$: ActionsObservable<any>) => {
        return action$.ofType(UsersActions.GET_CONVERSATIONS)
            .mergeMap(({ payload }) => {
                return this.usersService.getConversations(payload)
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

    getMessages = (action$: ActionsObservable<any>) => {
        return action$.ofType(UsersActions.GET_MESSAGES)
            .mergeMap(({ payload }) => {
                return this.usersService.getMessages(payload)
                    .map((result: any[]) => ({
                        type: UsersActions.RECEIVED_MESSAGES,
                        payload: result
                    }))
                    .catch(error => Observable.of({
                        type: UsersActions.FAILED_RECEIVED_MESSAGES,
                        payload: error
                    }));
            });
    }

    updateUser = (action$: ActionsObservable<any>) => {
        return action$.ofType(UsersActions.UPDATE_USER)
            .mergeMap(({ payload }) => {
                console.log("epic: ", payload)
                return this.usersService.updateUser(payload.user, payload.userId)
                    .map((result: any[]) => ({
                        type: UsersActions.UPDATED_USER,
                        payload: result
                    }))
                    .catch(error => Observable.of({
                        type: UsersActions.FAILED_UPDATED_USER,
                        payload: error
                    }));
            });
    }

    updateImage = (action$: ActionsObservable<any>) => {
        return action$.ofType(UsersActions.UPDATE_IMAGE)
            .mergeMap(({ payload }) => {
                console.log("epic: ", payload)
                return this.usersService.updateImage(payload.image, payload.userId)
                    .map((result: any[]) => ({
                        type: UsersActions.UPDATED_IMAGE,
                        payload: result
                    }))
                    .catch(error => Observable.of({
                        type: UsersActions.FAILED_UPDATED_IMAGE,
                        payload: error
                    }));
            });
    }

    deleteUser = (action$: ActionsObservable<any>) => {
        return action$.ofType(UsersActions.DELETE_USER)
            .mergeMap(({ payload }) => {
                console.log("epic: ", payload)
                return this.usersService.deleteUser(payload)
                    .map(() => ({
                        type: UsersActions.DELETED_USER,
                        payload: payload
                    }))
                    .catch(error => Observable.of({
                        type: UsersActions.FAILED_DELETED_USER,
                        payload: error
                    }));
            });
    }

    addRating = (action$: ActionsObservable<any>) => {
        return action$.ofType(UsersActions.ADD_RATING)
            .mergeMap(({ payload }) => {
                console.log("epic: ", payload)
                return this.usersService.addRating(payload.rating, payload.userId)
                    .map((result: any[]) => ({
                        type: UsersActions.ADDED_RATING,
                        payload: result
                    }))
                    .catch(error => Observable.of({
                        type: UsersActions.FAILED_ADDED_RATING,
                        payload: error
                    }));
            });
    }
}