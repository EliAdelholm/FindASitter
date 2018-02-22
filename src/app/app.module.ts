import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterSitterComponent } from './home/register-sitter/register-sitter.component';
import { RegisterBabyComponent } from './home/register-baby/register-baby.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './home/contact/contact.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PortalComponent } from './portal/portal.component';
import { FindBabyComponent } from './portal/find-baby/find-baby.component';
import { FindSitterComponent } from './portal/find-sitter/find-sitter.component';
import { OverviewComponent } from './portal/overview/overview.component';
import { IndexComponent } from './home/index/index.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterSitterComponent,
		RegisterBabyComponent,
		HomeComponent,
		ContactComponent,
		PageNotFoundComponent,
		PortalComponent,
		FindBabyComponent,
		FindSitterComponent,
		OverviewComponent,
		IndexComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule
	],
	providers: [AuthGuardService, AuthService],
	bootstrap: [AppComponent]
})
export class AppModule { }
