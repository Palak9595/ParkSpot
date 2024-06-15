import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeMainSectionComponent } from './home-main-section/home-main-section.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { SlotsComponent } from './dashboard/slots/slots.component';
import { BookingsComponent } from './dashboard/bookings/bookings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookslotComponent } from './dashboard/bookslot/bookslot.component';


import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderLoginComponent } from './header-login/header-login.component';
import { AddLocationComponent } from './admin/admin-dashboard/add-location/add-location.component';
import { AddSlotComponent } from './admin/admin-dashboard/add-slot/add-slot.component';
import { AllbookingsComponent } from './admin/admin-dashboard/allbookings/allbookings.component';
import { AddVehicleComponent } from './admin/admin-dashboard/add-vehicle/add-vehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeMainSectionComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    SlotsComponent,
    BookingsComponent,
    DashboardComponent,
    BookslotComponent,
    AddLocationComponent,
    AddSlotComponent,
    AllbookingsComponent,
    AddVehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
