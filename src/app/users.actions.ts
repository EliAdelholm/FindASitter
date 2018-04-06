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
    static DELETE_BABY: string = 'DELETE_BABY';
    static ADD_SITTER: string = 'ADD_SITTER';
    static DELETE_SITTER: string = 'DELETE_SITTER';

    setType(isBaby: boolean): void {
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

     deleteBaby(babyId: string): void {
        this.ngRedux.dispatch({
            type: UsersActions.DELETE_BABY,
            payload: babyId
        })
     }

     addSitter(sitter: {}): void { 
        this.ngRedux.dispatch({
            type: UsersActions.ADD_SITTER,
            payload: sitter
        })
     }

     deleteSitter(sitterId: string): void {
        this.ngRedux.dispatch({
            type: UsersActions.DELETE_SITTER,
            payload: sitterId
        })
     }
}
