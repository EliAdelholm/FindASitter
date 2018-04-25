import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

// Material Design
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Services
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './home/contact/contact.component';
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



@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		HomeComponent,
		ContactComponent,
		PageNotFoundComponent,
		PortalComponent,
		OverviewComponent,
		IndexComponent,
		UsersListComponent,
		UserDetailsComponent,
		FindBikerComponent,
		BikerProfileComponent,
		MessagesComponent
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
		MatSelectModule,
		MatCardModule,
		MatListModule,
		MomentModule,
		MatExpansionModule,
		MatButtonToggleModule,
		NgReduxModule,
		NgReduxRouterModule.forRoot(),
		HttpClientModule,
		MatIconModule,
		MatChipsModule
	],
	providers: [AuthGuardService, AuthService, MatMomentDateModule, UsersActions, UsersService, UsersEpic],
	bootstrap: [AppComponent]
})

export class AppModule {
	constructor(private ngRedux: NgRedux<IAppState>,
		private devTool: DevToolsExtension,
		private ngReduxRouter: NgReduxRouter, private usersEpic: UsersEpic ) {


		// From app.module.ts - constructor
		const rootEpic = combineEpics(
			this.usersEpic.getUsers,
			this.usersEpic.getConversations,
			// this.usersEpic.addUser,
			// this.usersEpic.updateUser,
			// this.usersEpic.deleteUser
		);
		// Middleware
		// http://redux.js.org/docs/advanced/Middleware.html
		// https://github.com/angular-redux/store/blob/master/articles/epics.md
		// const epicMiddleware = createEpicMiddleware(rootEpic);
		const middleware = [
			createEpicMiddleware(rootEpic), createLogger({ level: 'info', collapsed: true })
		];
		this.ngRedux.configureStore(
			rootReducer,
			{}, middleware, [devTool.isEnabled() ? devTool.enhancer() : f => f]);

		// this.ngRedux.configureStore(
		// 	rootReducer, {}, [], [ devTool.isEnabled() ? devTool.enhancer() : f => f]);

		ngReduxRouter.initialize(/* args */);
	}

}
