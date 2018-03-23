import { UsersActions } from './users.actions';
import { UsersState } from './store/store';
import { tassign } from 'tassign';

const INITIAL_STATE: UsersState = {
    isBaby: undefined, 
    babies: [
        { username: "oli", firstname: "Oliver", lastname: "Kirschberg", birthDate: new Date(2017, 5, 17), area: "Greater Copenhagen", rating: [], gender: "Male" },
        { username: "elin", firstname: "Elin", lastname: "Skuladottir", birthDate: new Date(2012, 8, 18), area: "Greater Copenhagen", rating: [], gender: "Female" }
    ], 
    sitters: [
        { username: "death-metal", firstname: "Christian", lastname: "Kirschberg", birthDate: new Date(1979, 1, 1), area: "Greater Copenhagen", rating: [], gender: "Male", rate: 120, workAreas: ['Greater Copenhagen', 'Sealand'] },
		{ username: "EliA", firstname: "Eli", lastname: "Adelholm", birthDate: new Date(1993, 4, 8), area: "Greater Copenhagen", rating: [], gender: "Female", rate: 150, workAreas: ['Greater Copenhagen', 'Sealand'] },
    ]
}

export function usersReducer(state: UsersState = INITIAL_STATE, action: any) {

    switch (action.type) {

        case UsersActions.SET_TYPE:
            return tassign(state, { isBaby: action.payload });

        case UsersActions.ADD_BABY:
            return tassign(state, { babies: [...state.babies, action.payload] });

        case UsersActions.ADD_SITTER:
            return tassign(state, { sitters: [...state.sitters, action.payload] });

        default:
            return state;
    }
}
