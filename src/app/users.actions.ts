import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store/store';
import { Baby } from './entities/baby';

@Injectable()
export class UsersActions {

    constructor(private ngRedux: NgRedux<IAppState>) {

    }

    // Available actions
    static AUTHENTICATE: string = 'AUTHENTICATE';
    static RECEIVED_AUTHENTICATE: string = 'RECEIVED_AUTHENTICATE';
    static FAILED_RECEIVED_AUTHENTICATE: string = 'FAILED_RECEIVED_AUTHENTICATE';

    static GET_AUTH_USER: string = 'GET_AUTH_USER';
    static RECEIVED_AUTH_USER: string = 'RECEIVED_AUTH_USER';
    static FAILED_RECEIVED_AUTH_USER: string = 'FAILED_RECEIVED_AUTH_USER';

    static GET_USERS: string = 'GET_USERS';
    static RECEIVED_USERS: string = 'RECEIVED_USERS';
    static FAILED_RECEIVED_USERS: string = 'FAILED_RECEIVED_USERS';

    static GET_BIKES: string = 'GET_BIKES';
    static RECEIVED_BIKES: string = 'RECEIVED_BIKES';
    static FAILED_RECEIVED_BIKES: string = 'FAILED_RECEIVED_BIKES';

    static LOOKUP_CONVERSATION: string = 'LOOKUP_CONVERSATION';
    static RECEIVED_LOOKUP_CONVERSATION: string = 'RECEIVED_LOOKUP_CONVERSATION';
    static FAILED_RECEIVED_LOOKUP_CONVERSATION: string = 'FAILED_RECEIVED_LOOKUP_CONVERSATION';
    
    static ADD_CONVERSATION: string = 'ADD_CONVERSATION';
    static ADDED_CONVERSATION: string = 'ADDED_CONVERSATION';
    static FAILED_ADDED_CONVERSATION: string = 'FAILED_ADDED_CONVERSATION';

    static GET_CONVERSATIONS: string = 'GET_CONVERSATIONS';
    static RECEIVED_CONVERSATIONS: string = 'RECEIVED_CONVERSATIONS';
    static FAILED_RECEIVED_CONVERSATIONS: string = 'FAILED_RECEIVED_CONVERSATIONS';

    static GET_MESSAGES: string = 'GET_MESSAGES';
    static RECEIVED_MESSAGES: string = 'RECEIVED_MESSAGES';
    static FAILED_RECEIVED_MESSAGES: string = 'FAILED_RECEIVED_MESSAGES';

    static UPDATE_USER: string = 'UPDATE_USER';
    static UPDATED_USER: string = 'UPDATED_USER';
    static FAILED_UPDATED_USER: string = 'FAILED_UPDATED_USER';

    static UPDATE_IMAGE: string = 'UPDATE_IMAGE';
    static UPDATED_IMAGE: string = 'UPDATED_IMAGE';
    static FAILED_UPDATED_IMAGE: string = 'FAILED_UPDATED_IMAGE';

    static DELETE_USER: string = 'DELETE_USER';
    static DELETED_USER: string = 'DELETED_USER';
    static FAILED_DELETED_USER: string = 'FAILED_DELETED_USER';

    static ADD_RATING: string = 'ADD_RATING';
    static ADDED_RATING: string = 'ADDED_RATING';
    static FAILED_ADDED_RATING: string = 'FAILED_ADDED_RATING';

    static RESET_REQUEST_STATUS: string = 'RESET_REQUEST_STATUS';

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

    getBikes(userId: number) {
        this.ngRedux.dispatch({
            type: UsersActions.GET_BIKES,
            payload: userId
        })
    }

    lookupConversation(user1: number, user2: number) {
        this.ngRedux.dispatch({
            type: UsersActions.LOOKUP_CONVERSATION,
            payload: {user1, user2}
        })
    }

    addConversation(user1: number, user2: number) {
        this.ngRedux.dispatch({
            type: UsersActions.ADD_CONVERSATION,
            payload: {user1, user2}
        })
    }

    getConversations(userId: number) {
        this.ngRedux.dispatch({
            type: UsersActions.GET_CONVERSATIONS,
            payload: userId
        })
    }

    getMessages(conversationId: number) {
        this.ngRedux.dispatch({
            type: UsersActions.GET_MESSAGES,
            payload: conversationId
        })
    }

    updateUser(user: {}, userId: number): void {
        this.ngRedux.dispatch({
            type: UsersActions.UPDATE_USER,
            payload: { user, userId }
        })
    }

    updateImage(image: {}, userId: number) {
        this.ngRedux.dispatch({
            type: UsersActions.UPDATE_IMAGE,
            payload: { image, userId }
        })
    }

    deleteUser(userId: number): void {
        this.ngRedux.dispatch({
            type: UsersActions.DELETE_USER,
            payload: userId
        })
    }

    addRating(rating: {}, userId: number): void {
        this.ngRedux.dispatch({
            type: UsersActions.ADD_RATING,
            payload: { rating, userId }
        })
    }

    resetRequestStatus() {
        this.ngRedux.dispatch({
            type: UsersActions.RESET_REQUEST_STATUS
        })
    }

}
