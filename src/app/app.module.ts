import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { FilterBikers } from './filter.bikers';

// Material Design
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

// Services
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { BikeService } from './bike.service'

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PortalComponent } from './portal/portal.component';
import { OverviewComponent } from './portal/overview/overview.component';
import { IndexComponent } from './home/index/index.component';
import { UsersListComponent } from './portal/users-list/users-list.component';
import { UserDetailsComponent } from './portal/user-details/user-details.component';
import { NgRedux, DevToolsExtension, NgReduxModule } from '@angular-redux/store';
import { IAppState, rootReducer } from './store/store';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { UsersActions } from './users.actions';
import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';

import { UsersEpic } from './users.epic';
import { createEpicMiddleware, combineEpics } from "redux-observable";
import { createLogger } from "redux-logger";
import { FindBikerComponent } from './portal/find-biker/find-biker.component';
import { BikerProfileComponent } from './portal/biker-profile/biker-profile.component';
import { MessagesComponent } from './portal/messages/messages.component'
import { JwtModule } from '@auth0/angular-jwt';
import { StaticEpic } from './static.epic';
import { StaticActions } from './static.actions';
import { StaticService } from './static.service';
import { SignupService } from './signup.service';
import { ProfileComponent } from './portal/profile/profile.component';
import { ConversationComponent } from './portal/messages/conversation/conversation.component';
import { NoConversationComponent } from './portal/messages/no-conversation/no-conversation.component';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './home/reset-password/reset-password.component';
import { ConfirmAccountComponent } from './home/confirm-account/confirm-account.component';
import { DecimalPipe } from './decimal.pipe';
import { AddBikerComponent } from './portal/profile/add-biker/add-biker.component';

export function tokenGetter() {
	return localStorage.getItem('APIToken');
}

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		HomeComponent,
		PageNotFoundComponent,
		PortalComponent,
		OverviewComponent,
		IndexComponent,
		UsersListComponent,
		UserDetailsComponent,
		FindBikerComponent,
		BikerProfileComponent,
		MessagesComponent,
		ProfileComponent,
		FilterBikers,
		ConversationComponent,
		NoConversationComponent,
		ForgotPasswordComponent,
		ResetPasswordComponent,
		ConfirmAccountComponent,
		DecimalPipe,
		AddBikerComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		MatMenuModule,
		NoopAnimationsModule,
		MatButtonModule,
		MatToolbarModule,
		MatMomentDateModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatInputModule,
		MatAutocompleteModule,
		MatSelectModule,
		MatCardModule,
		MatListModule,
		MomentModule,
		MatExpansionModule,
		MatButtonToggleModule,
		NgReduxModule,
		NgReduxRouterModule.forRoot(),
		MatIconModule,
		MatChipsModule,
		MatDialogModule,
		HttpClientModule,
		MaterialFileInputModule,
		FormsModule,
		NgxMatSelectSearchModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: tokenGetter,
				whitelistedDomains: ['localhost:3000'],
        		blacklistedRoutes: ['localhost:3000/auth/']
			}
		})
	],
	providers: [AuthGuardService, AuthService, MatMomentDateModule, 
		UsersActions, UsersService, UsersEpic, 
		StaticActions, StaticService, StaticEpic,
		SignupService, WebsocketService, ChatService, BikeService
	],
	bootstrap: [AppComponent]
})

export class AppModule {
	constructor(private ngRedux: NgRedux<IAppState>,
		private devTool: DevToolsExtension,
		private ngReduxRouter: NgReduxRouter, private usersEpic: UsersEpic, private staticEpic: StaticEpic) {

		const rootEpic = combineEpics(
			this.usersEpic.authenticate,
			this.usersEpic.getAuthUser,
			this.usersEpic.getUsers,
			this.usersEpic.getBikes,
			this.usersEpic.lookupConversation,
			this.usersEpic.addConversation,
			this.usersEpic.getConversations,
			this.usersEpic.getMessages,
			this.usersEpic.updateUser,
			this.usersEpic.updateImage,
			this.usersEpic.deleteUser,
			this.usersEpic.addRating,

			this.staticEpic.getAreas,
			this.staticEpic.getLicences,
			this.staticEpic.getMakes
		);

		const middleware = [
			createEpicMiddleware(rootEpic), createLogger({ level: 'info', collapsed: true })
		];
		this.ngRedux.configureStore(
			rootReducer,
			{}, middleware, [devTool.isEnabled() ? devTool.enhancer() : f => f]);

		ngReduxRouter.initialize(/* args */);
	}

}
