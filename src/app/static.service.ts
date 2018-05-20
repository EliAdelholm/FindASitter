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

    getMakes() {
        return this.http.get('/api/motorcycle-makes');
    }

    static getInitialStaticState(): StaticState {
        return { areas: [], licences: [], profileView: "details", makes: [] };
    }
}