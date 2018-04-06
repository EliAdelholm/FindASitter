
var deepFreeze = require('deep-freeze');
import { usersReducer } from './users.reducer';
import * as types from './users.actions';
import { UsersService } from './users.service';

describe('users reducer', () => {

    it('Should return the initial state', () => {
        expect(usersReducer(undefined, {})).toEqual( UsersService.getInitialUsersState() );
    });

    it('Toggle isBaby or sitter', () => {
        let state = UsersService.getInitialUsersState();
        deepFreeze(state);
        let newState = UsersService.getInitialUsersState();
        newState.isBaby = true;

        expect(
            usersReducer(state, {
                type: types.UsersActions.SET_TYPE,
                payload: true
            })).toEqual(newState);
    });

    it('Should add a new baby object to the babies array', () => {
        // Create mock of initial state
        // Add baby by calling reducer
        // Check that state is correct. Use deep freeze to check for mutations

        let initialState = UsersService.getInitialUsersState();
        deepFreeze(initialState)

        // TODO: refactor into function
        let baby = { username: 'test 1', firstname: 'Peter', lastname: 'Peturson', birthDate: new Date(2018, 0, 1), area: 'Copenhagen', gender: 'male', rating: [] }

        let afterState = UsersService.getInitialUsersState();
        afterState.babies.push(baby);

        let newState = usersReducer(initialState, {
            type: types.UsersActions.ADD_BABY,
            payload: baby
        })

        expect(newState.babies.length).toEqual(1);
        expect(newState).toEqual(afterState)
    })

    it('Should delete a baby by id', () => {
        let initialState = UsersService.getInitialUsersState();
        deepFreeze(initialState)

        // TODO: refactor into function
        let baby = { username: 'test 1', firstname: 'Peter', lastname: 'Peturson', birthDate: new Date(2018, 0, 1), area: 'Copenhagen', gender: 'male', rating: [] }

        let populatedState = usersReducer(initialState, {
            type: types.UsersActions.ADD_BABY,
            payload: baby
        })

        let newState = usersReducer(populatedState, {
            type: types.UsersActions.DELETE_BABY,
            payload: 'test 1'
        })

        expect(newState.babies.length).toEqual(0);
        expect(newState).toEqual(initialState)

    })
});