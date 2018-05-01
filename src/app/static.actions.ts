import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store/store';

@Injectable()
export class StaticActions {

    constructor( private ngRedux: NgRedux<IAppState> ) { 

    }
    
    // Available actions
    static GET_AREAS: string = 'GET_AREAS';
    static RECEIVED_AREAS: string = 'RECEIVED_AREAS';
    static FAILED_RECEIVED_AREAS: string = 'FAILED_RECEIVED_AREAS';

    static GET_LICENCES: string = 'GET_LICENCES';
    static RECEIVED_LICENCES: string = 'RECEIVED_LICENCES';
    static FAILED_RECEIVED_LICENCES: string = 'FAILED_RECEIVED_LICENCES';

    getAreas() {
        this.ngRedux.dispatch({
            type: StaticActions.GET_AREAS
        })
    }

    getLicences() {
        this.ngRedux.dispatch({
            type: StaticActions.GET_LICENCES
        })
    }
}
