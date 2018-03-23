import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store/store';
import { Baby } from './entities/baby';

@Injectable()
export class UsersActions {

    constructor( private ngRedux: NgRedux<IAppState> ) { 

    }
    
    // Available actions
    static SET_TYPE: string = 'SET_TYPE';
    static ADD_BABY: string = 'ADD_BABY';
    static ADD_SITTER: string = 'ADD_SITTER';

    setType(isBaby: boolean): void {
        console.log(isBaby)
        this.ngRedux.dispatch({
            type: UsersActions.SET_TYPE,
            payload: isBaby
        })
    }

    addBaby(baby: {}): void { 
        this.ngRedux.dispatch({
            type: UsersActions.ADD_BABY,
            payload: baby
        })
     };

     addSitter(sitter: {}): void { 
        this.ngRedux.dispatch({
            type: UsersActions.ADD_SITTER,
            payload: sitter
        })
     };
}
