import { UsersActions } from './users.actions';
import { UsersState } from './store/store';
import { tassign } from 'tassign';
import { UsersService } from './users.service';

const INITIAL_STATE: UsersState = UsersService.getInitialUsersState();

export function usersReducer(state: UsersState = INITIAL_STATE, action: any) {

    switch (action.type) {
        case UsersActions.AUTHENTICATE:
            return state;

        case UsersActions.RECEIVED_AUTHENTICATE:
            localStorage.setItem('APIToken', action.payload.token);
            return tassign(state, { auth: action.payload.data });

        case UsersActions.FAILED_RECEIVED_AUTHENTICATE:
            return state;

        case UsersActions.GET_AUTH_USER:
            return state;

        case UsersActions.RECEIVED_AUTH_USER:
            return tassign(state, { auth: action.payload.data });

        case UsersActions.FAILED_RECEIVED_AUTH_USER:
            return state;

        case UsersActions.GET_USERS:
            return state;

        case UsersActions.RECEIVED_USERS:
            return tassign(state, { profiles: action.payload.data });

        case UsersActions.FAILED_RECEIVED_USERS:
            return state;

        case UsersActions.GET_CONVERSATIONS:
            return state;

        case UsersActions.RECEIVED_CONVERSATIONS:
            return tassign(state, { conversations: action.payload.data });

        case UsersActions.FAILED_RECEIVED_CONVERSATIONS:
            return state;

        case UsersActions.ADD_USER:
            return state;

        case UsersActions.ADDED_USER:
            localStorage.setItem('APIToken', action.payload.token);
            return tassign(state, { auth: action.payload.data });

        case UsersActions.FAILED_ADDED_USER:
            return state;

        case UsersActions.UPDATE_USER:
            return state;

        case UsersActions.UPDATED_USER:
            let updatedUser = Object.assign(state.auth, action.payload.data);
            return tassign(state, { auth: updatedUser });

        case UsersActions.FAILED_UPDATED_USER:
            return state;

        case UsersActions.UPDATE_IMAGE:
            return state;

        case UsersActions.UPDATED_IMAGE:
            let updatedImage = Object.assign(state.auth, action.payload.data);
            return tassign(state, { auth: updatedImage });

        case UsersActions.FAILED_UPDATED_IMAGE:
            return state;

        case UsersActions.DELETE_USER:
            return state;

        case UsersActions.DELETED_USER:
            localStorage.removeItem('APIToken');
            return tassign(state, { auth: null });

        case UsersActions.FAILED_DELETED_USER:
            return state;

        // case UsersActions.SET_TYPE: // payload: boolean
        //     return tassign(state, { isBaby: action.payload });

        // case UsersActions.ADD_BABY: // payload: baby object
        //     return tassign(state, { babies: [...state.babies, action.payload] });

        // case UsersActions.DELETE_BABY: // payload: babyId
        //     var newsBabyArray = state.babies.filter((item) => item.username !== action.payload);
        //     return tassign(state, { babies: newBabyArray });

        // case UsersActions.ADD_SITTER: // payload: sitter object
        //     return tassign(state, { sitters: [...state.sitters, action.payload] });

        // case UsersActions.DELETE_SITTER: // payload: sitterId
        //     let newsSitterArray = state.sitters.filter((item) => item.username !== action.payload);
        //     return tassign(state, { sitters: newSitterArray });

        // get baby by id action.payload.id
        // let babyCopy = tassing(baby, {rating: [ ...baby.rating, action.payload.rating] })
        // return tassign(babies [ ...state.babies] )
        default:
            return state;
    }
}
