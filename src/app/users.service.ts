import { Injectable } from '@angular/core';
import { UsersState } from './store/store';

@Injectable()
export class UsersService {
    static getInitialUsersState() : UsersState {
        return { isBaby: undefined, babies: [], sitters: [] };
    }
}