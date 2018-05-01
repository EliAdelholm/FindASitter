import { Injectable } from '@angular/core';
import { StaticState } from './store/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class StaticService {

    constructor(private http: HttpClient) { }

    getAreas() {
        return this.http.get('/api/areas');
    }

    getLicences() {
        return this.http.get('/api/licences');
    }

    static getInitialStaticState(): StaticState {
        return { areas: [], licences: [] };
    }
}