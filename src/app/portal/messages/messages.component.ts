import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';
import { UsersActions } from '../../users.actions';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth.service';

@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit, OnDestroy {
	subscription: Subscription;
	conversations = [];

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	constructor(private ngRedux: NgRedux<IAppState>, private usersActions: UsersActions, private auth: AuthService) { }

	ngOnInit() {
		this.usersActions.getConversations(this.auth.authenticatedUserId());

		this.subscription = this.ngRedux.select(state => state.users).subscribe(users => {
			this.conversations = users.conversations
		});

		
	}

}
