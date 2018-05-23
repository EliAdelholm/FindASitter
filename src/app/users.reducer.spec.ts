
var deepFreeze = require('deep-freeze');
import { usersReducer } from './users.reducer';
import * as types from './users.actions';
import { UsersService } from './users.service';

function getUser() {
    return {
        "id": 1,
        "email": "findabiker@eliadelholm.com",
        "username": "Lady Triumph",
        "firstname": "Eli",
        "lastname": "Adelholm",
        "admin": 1,
        "birthdate": "1993-04-08",
        "areaId": 1,
        "licence": 1,
        "phone": 93938121,
        "createdAt": "2018-04-19 18:04:60",
        "verified": 1,
        "image": "uploads/1526817949-1.jpg",
        "ratings": [],
        "bikes": []
    }
}

function getUpdatedUser() {
    return {
        "id": 1,
        "email": "findabiker@eliadelholm.com",
        "username": "Lady Triumph",
        "firstname": "New name",
        "lastname": "New last name",
        "admin": 1,
        "birthdate": "1993-04-08",
        "areaId": 1,
        "licence": 1,
        "phone": 93938121,
        "createdAt": "2018-04-19 18:04:60",
        "verified": 1,
        "image": "uploads/1526817949-1.jpg",
        "ratings": [],
        "bikes": []
    }
}

function getRating() {
    return {
        "userId": 2,
        "rating": 5,
        "message": "Test rating!"
    }
}

describe('users reducer', () => {

    it('Should return the initial state', () => {
        expect(usersReducer(undefined, {})).toEqual(UsersService.getInitialUsersState());
    });

    it('Should add a user to the auth object', () => {
        // Create mock of initial state
        // Add user by calling reducer
        // Check that state is correct. Use deep freeze to check for mutations

        let initialState = UsersService.getInitialUsersState();
        deepFreeze(initialState)

        let authUser = { data: getUser() };

        let afterState = UsersService.getInitialUsersState();
        afterState.auth = authUser.data;

        let newState = usersReducer(initialState, {
            type: types.UsersActions.RECEIVED_AUTH_USER,
            payload: authUser
        })

        expect(newState).toEqual(afterState)
    })

    it('Should update auth user', () => {
        let initialState = UsersService.getInitialUsersState();
        deepFreeze(initialState)

        let authUser = { data: getUser() };

        let afterState = JSON.parse(JSON.stringify(UsersService.getInitialUsersState()));
        afterState.auth = authUser.data;

        let populatedState = usersReducer(initialState, {
            type: types.UsersActions.RECEIVED_AUTH_USER,
            payload: authUser
        })

        let updatedUser = { data: getUpdatedUser() };

        let afterUpdatedState = afterState;
        afterUpdatedState.auth = updatedUser.data;

        let newState = usersReducer(populatedState, {
            type: types.UsersActions.UPDATED_USER,
            payload: updatedUser
        })

        expect(newState).toEqual(afterUpdatedState)
    })

    it('Should delete auth user', () => {
        let initialState = UsersService.getInitialUsersState();
        deepFreeze(initialState)

        let authUser = { data: getUser() };

        let afterState = JSON.parse(JSON.stringify(UsersService.getInitialUsersState()));
        afterState.auth = authUser.data;

        let populatedState = usersReducer(initialState, {
            type: types.UsersActions.RECEIVED_AUTH_USER,
            payload: authUser
        })

        let afterDeletedState = afterState;
        afterDeletedState.auth = null;

        let newState = usersReducer(populatedState, {
            type: types.UsersActions.DELETED_USER,
        })

        expect(newState).toEqual(afterDeletedState)
    })

    it('Should add a user to profiles array', () => {
        const initialState = UsersService.getInitialUsersState();
        deepFreeze(initialState)

        let user = { data: [getUser()] };

        let afterState = JSON.parse(JSON.stringify(UsersService.getInitialUsersState()));
        afterState.profiles = user.data;

        let newState = usersReducer(initialState, {
            type: types.UsersActions.RECEIVED_USERS,
            payload: user
        })

        expect(newState.profiles.length).toEqual(1);
        expect(newState).toEqual(afterState)
    })

    it('Should add a rating to user profile', () => {
        const initialState = UsersService.getInitialUsersState();
        deepFreeze(initialState);

        const user = { data: [getUser()] };
        const rating = { data: getRating(), profile: getUser().id };

        const populatedState = usersReducer(initialState, {
            type: types.UsersActions.RECEIVED_USERS,
            payload: user
        });

        const newState = usersReducer(populatedState, {
            type: types.UsersActions.ADDED_RATING,
            payload: rating
        })

        expect(newState.profiles[0].ratings.length).toEqual(1)
    })

});