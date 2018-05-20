import { Component, OnInit, OnDestroy, ViewChildren, ViewChild, ElementRef, QueryList, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../store/store';
import { UsersActions } from '../../../users.actions';
import { Biker } from '../../../../entities/biker';
import { ChatService } from '../../../chat.service';

@Component({
	selector: 'app-conversation',
	templateUrl: './conversation.component.html',
	styleUrls: ['./conversation.component.scss']
})

export class ConversationComponent implements OnInit, OnDestroy, AfterViewInit {
	conversationId: number;
	subscription: Subscription;
	conversation;
	messages: any[];
	auth: Biker;
	newMessage: String = "";
	connected = false;
	gotMessages = false;

	constructor(private route: ActivatedRoute, private ngRedux: NgRedux<IAppState>, private usersActions: UsersActions, 
		private chat: ChatService) {
			this.route.params.subscribe((params: Params) => {
				console.log(params); 
				this.gotMessages = false;
				this.newMessage = "";
				this.conversationId = params.conversationId;
				this.ngOnInit();
				// this.callingFunction();
				// this will be called every time route changes
				// so you can perform your functionality here
			
			});
		 }
	@ViewChildren('chatMessages') chatMessages: QueryList<any>;
	@ViewChild('content') content: ElementRef;

	ngAfterViewInit() {
		this.chatMessages.changes.subscribe(this.scrollToBottom);
	}

	scrollToBottom = () => {
		try {
			this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
		} catch (err) { }
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	isFirst(messageId, userId) {
		// Get index of current message
		let index = this.messages.findIndex(message => message.id == messageId);

		// If the index is 0 return true
		if (index == 0) {
			return true
		}

		//  Get index of previous message
		let prevIndex = index - 1

		// If the userId is the same as the current userId return false
		if (this.messages[prevIndex].userId == userId) {
			return false;
		}

		// Else return true
		return true;
	}

	ngOnInit() {

		this.subscription = this.ngRedux.select(state => state.users).subscribe(users => {
			this.auth = users.auth;
			this.conversation = users.conversations.find(conversation => conversation.id == this.conversationId);
			this.messages = this.conversation && this.conversation.messages[0];

			if (this.conversation && !this.gotMessages) {
				console.log(this.conversation)
				this.usersActions.getMessages(this.conversationId)
				this.gotMessages = true;
			}

			if (this.auth && !this.connected) {

				this.chat.messages.subscribe(msg => {
					if (msg.conversationId == this.conversationId) {
						this.messages.push(msg)
					}
				})

				this.connected = true;
			}
		})
	}

	sendMessage() {
		if (this.newMessage) {
			this.chat.sendMsg({
				text: this.newMessage,
				userId: this.auth.id,
				username: this.auth.username,
				image: this.auth.image,
				conversationId: this.conversationId
			});
			this.newMessage = '';
		}
	}

}
