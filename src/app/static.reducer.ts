import { StaticActions } from './static.actions';
import { StaticState } from './store/store';
import { tassign } from 'tassign';
import { StaticService } from './static.service';

const INITIAL_STATE: StaticState = StaticService.getInitialStaticState();

export function staticReducer(state: StaticState = INITIAL_STATE, action: any) {

    switch (action.type) {
        case StaticActions.GET_AREAS:
            return state;

        case StaticActions.RECEIVED_AREAS:
            return tassign(state, { areas: action.payload.data });

        case StaticActions.FAILED_RECEIVED_AREAS:
            return state;

        case StaticActions.GET_LICENCES:
            return state;

        case StaticActions.RECEIVED_LICENCES:
            return tassign(state, { licences: action.payload.data });

        case StaticActions.FAILED_RECEIVED_LICENCES:
            return state;

        default:
            return state;
    }
}
