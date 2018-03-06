import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';

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
import { DataService } from './data.service';
import { BabiesListComponent } from './portal/babies-list/babies-list.component';
import { UserDetailsComponent } from './portal/user-details/user-details.component';



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
		IndexComponent,
		BabiesListComponent,
		UserDetailsComponent
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
		MatListModule
	],
	providers: [AuthGuardService, AuthService, DataService, MatMomentDateModule],
	bootstrap: [AppComponent]
})
export class AppModule { }
