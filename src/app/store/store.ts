import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { usersReducer } from './../users.reducer';
import { Sitter } from '../entities/sitter';
import { Baby } from '../entities/baby';

export class UsersState {
    isBaby: boolean;
    babies: Baby[];
    sitters: Sitter[];
}

export class IAppState {
    users?: UsersState;
}

export const rootReducer = combineReducers<IAppState>({
    users: usersReducer,

    router: routerReducer
});
