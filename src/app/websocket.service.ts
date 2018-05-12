import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { AuthService } from './auth.service';

@Injectable()
export class WebsocketService {

    // Our socket connection
    private socket;

    constructor(private auth: AuthService) { }

    connect(): Rx.Subject<MessageEvent> {

        this.socket = io();

        this.socket.emit('storeClientInfo', {userId: this.auth.authenticatedUserId()})

        // We define our observable which will observe any incoming messages
        // from our socket.io server.
        let observable = new Observable(observer => {
            this.socket.on('message', (data) => {
                console.log("Received message from Websocket Server")
                observer.next(data);
            })
            return () => {
                this.socket.disconnect();
            }
        });

        // We define our Observer which will listen to messages
        // from our other components and send messages back to our
        // socket server whenever the `next()` method is called.
        let observer = {
            next: (data: Object) => {
                this.socket.emit('message', data);
            },
        };

        // we return our Rx.Subject which is a combination
        // of both an observer and observable.
        return Rx.Subject.create(observer, observable);
    }

}