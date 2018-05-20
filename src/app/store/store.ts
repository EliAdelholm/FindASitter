import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { usersReducer } from './../users.reducer';
import { Biker } from '../../entities/biker';
import { staticReducer } from '../static.reducer';

export class UsersState {
    auth: Biker;
    profiles: Biker[];
    conversations: any[];
    requestStatus: string;
}

export class StaticState {
    areas: any[];
    licences: any[];
    profileView: String;
    makes: any[];
}

export class IAppState {
    users?: UsersState;
    static?: StaticState;
}

export const rootReducer = combineReducers<IAppState>({
    users: usersReducer,
    static: staticReducer,
    router: routerReducer
});
