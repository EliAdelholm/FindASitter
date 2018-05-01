import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './home/contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PortalComponent } from './portal/portal.component';
import { OverviewComponent } from './portal/overview/overview.component';
import { FindBikerComponent } from './portal/find-biker/find-biker.component';
import { IndexComponent } from './home/index/index.component';
import { AuthGuardService } from './auth-guard.service';
import { UsersListComponent } from './portal/users-list/users-list.component';
import { UserDetailsComponent } from './portal/user-details/user-details.component';
import { BikerProfileComponent } from './portal/biker-profile/biker-profile.component';
import { MessagesComponent } from './portal/messages/messages.component';
import { ProfileComponent } from './portal/profile/profile.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full'},
	{ path: 'home', component: HomeComponent, children: [
		{ path: 'index', redirectTo: '', pathMatch: 'full' },
		{ path: '', component: IndexComponent},
		{ path: 'login', component: LoginComponent },
		{ path: 'register', component: RegisterComponent},
		{ path: 'contact', component: ContactComponent },
	] },
	{ path: 'portal', component: PortalComponent, canActivate: [AuthGuardService], children: [
		{ path: 'overview', redirectTo: '', pathMatch: 'full' },
		{ path: '', component: OverviewComponent, canActivate: [AuthGuardService] },
		{ path: 'profile', component: ProfileComponent },
		{ path: 'find-biker', component: FindBikerComponent },
		{ path: 'messages', component: MessagesComponent},
		{ path: 'find-biker/:username', component: BikerProfileComponent },
		{ path: 'users/:type/:id', component: UserDetailsComponent},
		{ path: 'users', component: UsersListComponent},
	]},
	{ path: '**', component: PageNotFoundComponent }
];

// canActivate: [AuthGuardService],

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
