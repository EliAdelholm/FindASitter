import { UsersActions } from './users.actions';
import { UsersState } from './store/store';
import { tassign } from 'tassign';
import { UsersService } from './users.service';

const INITIAL_STATE: UsersState = UsersService.getInitialUsersState();

export function usersReducer(state: UsersState = INITIAL_STATE, action: any) {

    switch (action.type) {

        case UsersActions.SET_TYPE: // payload: boolean
            return tassign(state, { isBaby: action.payload });

        case UsersActions.ADD_BABY: // payload: baby object
            return tassign(state, { babies: [...state.babies, action.payload] });

        case UsersActions.DELETE_BABY: // payload: babyId
            let newBabyArray = state.babies.filter((item) => item.username !== action.payload);
            return tassign(state, { babies: newBabyArray });

        case UsersActions.ADD_SITTER: // payload: sitter object
            return tassign(state, { sitters: [...state.sitters, action.payload] });

        case UsersActions.DELETE_SITTER: // payload: sitterId
            let newSitterArray = state.sitters.filter((item) => item.username !== action.payload);
            return tassign(state, { sitters: newSitterArray });

        default:
            return state;
    }
}
