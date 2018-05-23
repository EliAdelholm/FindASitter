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
            return tassign(state, { auth: action.payload.data, requestStatus: "OK" });

        case UsersActions.FAILED_RECEIVED_AUTHENTICATE:
            return tassign(state, { requestStatus: "ERROR" });

        case UsersActions.GET_AUTH_USER:
            return state;

        case UsersActions.RECEIVED_AUTH_USER:
            return tassign(state, { auth: action.payload.data });

        case UsersActions.FAILED_RECEIVED_AUTH_USER:
            return tassign(state, { requestStatus: "Login failed. Try again." });

        case UsersActions.GET_USERS:
            return state;

        case UsersActions.RECEIVED_USERS:
            return tassign(state, { profiles: action.payload.data });

        case UsersActions.FAILED_RECEIVED_USERS:
            return state;

        case UsersActions.GET_BIKES:
            return state;

        case UsersActions.RECEIVED_BIKES:
            if (action.payload.data.length >= 1) {
                let userIndex = state.profiles.findIndex(profile => profile.id == action.payload.userId)
                let newBikes = [...state.profiles[userIndex].bikes, action.payload.data];
                let newProfileBikeObj = Object.assign({}, state.profiles[userIndex]);
                newProfileBikeObj.bikes = newBikes;

                let newBikeProfiles = [...state.profiles.slice(0, userIndex),
                    newProfileBikeObj,
                ...state.profiles.slice(userIndex + 1)];
                return tassign(state, { profiles: newBikeProfiles });
            }

        case UsersActions.FAILED_RECEIVED_BIKES:
            return state;

        case UsersActions.LOOKUP_CONVERSATION:
            return tassign(state, { requestStatus: null });

        case UsersActions.RECEIVED_LOOKUP_CONVERSATION:
            return tassign(state, { requestStatus: action.payload.conversationId });

        case UsersActions.FAILED_RECEIVED_LOOKUP_CONVERSATION:
            return tassign(state, { requestStatus: action.payload.conversationId });

        case UsersActions.ADD_CONVERSATION:
            return tassign(state, { requestStatus: null });

        case UsersActions.ADDED_CONVERSATION:
            return tassign(state, { requestStatus: action.payload.conversationId });

        case UsersActions.FAILED_ADDED_CONVERSATION:
            return tassign(state, { requestStatus: 'ERROR' });

        case UsersActions.GET_CONVERSATIONS:
            return state;

        case UsersActions.RECEIVED_CONVERSATIONS:
            return tassign(state, { conversations: action.payload.data });

        case UsersActions.FAILED_RECEIVED_CONVERSATIONS:
            return state;

        case UsersActions.GET_MESSAGES:
            return state;

        case UsersActions.RECEIVED_MESSAGES:
            let conversationIndex = state.conversations.findIndex(conversation => conversation.id == action.payload.conversation)
            let newMessages = [...state.conversations[conversationIndex].messages, action.payload.data];
            // console.log(action.payload.data)
            // console.log(newMessages)
            let newConversation = Object.assign({}, state.conversations[conversationIndex]);
            newConversation.messages = newMessages;
            // console.log(newConversation)

            let newConversations = [...state.conversations.slice(0, conversationIndex), newConversation,
            ...state.conversations.slice(conversationIndex + 1)];
            return tassign(state, { conversations: newConversations });


        case UsersActions.FAILED_RECEIVED_MESSAGES:
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

        case UsersActions.ADD_RATING:
            return state;

        case UsersActions.ADDED_RATING:
            let index = state.profiles.findIndex(profile => profile.id == action.payload.profile)
            let newRatings = [...state.profiles[index].ratings, action.payload.data];
            let newProfileObj = Object.assign({}, state.profiles[index]);
            newProfileObj.ratings = newRatings;

            let newProfiles = [...state.profiles.slice(0, index),
                newProfileObj,
            ...state.profiles.slice(index + 1)];
            return tassign(state, { profiles: newProfiles, requestStatus: "OK" });


        case UsersActions.FAILED_ADDED_RATING:
            return state;

        case UsersActions.RESET_REQUEST_STATUS:
            return tassign(state, { requestStatus: null });

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
