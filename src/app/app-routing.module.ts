import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { RegisterBabyComponent } from './home/register-baby/register-baby.component';
import { RegisterSitterComponent } from './home/register-sitter/register-sitter.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './home/contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PortalComponent } from './portal/portal.component';
import { OverviewComponent } from './portal/overview/overview.component';
import { FindBabyComponent } from './portal/find-baby/find-baby.component';
import { FindSitterComponent } from './portal/find-sitter/find-sitter.component';
import { IndexComponent } from './home/index/index.component';
import { AuthGuardService } from './auth-guard.service';
import { BabiesListComponent } from './portal/babies-list/babies-list.component';
import { UserDetailsComponent } from './portal/user-details/user-details.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full'},
	{ path: 'home', component: HomeComponent, children: [
		{ path: '', redirectTo: 'index', pathMatch: 'full' },
		{ path: 'index', component: IndexComponent},
		{ path: 'login', component: LoginComponent },
		{ path: 'register-baby', component: RegisterBabyComponent},
		{ path: 'register-sitter', component: RegisterSitterComponent},
		{ path: 'contact', component: ContactComponent },
	] },
	{ path: 'portal', component: PortalComponent, children: [
		{ path: '', redirectTo: 'overview', pathMatch: 'full' },
		{ path: 'overview', component: OverviewComponent },
		{ path: 'find-baby', component: FindBabyComponent },
		{ path: 'find-sitter', component: FindSitterComponent},
		{ path: 'users/:type/:id', component: UserDetailsComponent},
		{ path: 'users', component: BabiesListComponent},
	]},
	{ path: '**', component: PageNotFoundComponent }
];

// canActivate: [AuthGuardService],

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
