import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { usersReducer } from './../users.reducer';
import { Biker } from '../../entities/biker';

export class UsersState {
    profiles: Biker[];
    conversations: any[]
}

export class IAppState {
    users?: UsersState;
}

export const rootReducer = combineReducers<IAppState>({
    users: usersReducer,

    router: routerReducer
});
