import { Injectable } from "@angular/core";
import { ActionsObservable } from "redux-observable";
import { Observable } from 'rxjs/Observable';
import { StaticService } from "./static.service";
import { StaticActions } from "./static.actions";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StaticEpic {

    constructor(private staticService: StaticService) { }

    getAreas = (action$: ActionsObservable<any>) => {
        return action$.ofType(StaticActions.GET_AREAS)
            .mergeMap(({ payload }) => {
                return this.staticService.getAreas()
                    .map((result: any[]) => ({
                        type: StaticActions.RECEIVED_AREAS,
                        payload: result
                    }))
                    .catch(error => Observable.of({
                        type: StaticActions.FAILED_RECEIVED_AREAS,
                        payload: error
                    }));
            });
    }

    getLicences = (action$: ActionsObservable<any>) => {
        return action$.ofType(StaticActions.GET_LICENCES)
            .mergeMap(({ payload }) => {
                return this.staticService.getLicences()
                    .map((result: any[]) => ({
                        type: StaticActions.RECEIVED_LICENCES,
                        payload: result
                    }))
                    .catch(error => Observable.of({
                        type: StaticActions.FAILED_RECEIVED_LICENCES,
                        payload: error
                    }));
            });
    }
}