import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SlotsComponent } from './dashboard/slots/slots.component';
import { BookingsComponent } from './dashboard/bookings/bookings.component';
import { BookslotComponent } from './dashboard/bookslot/bookslot.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'dashboard',component:DashboardComponent,
  children:[
    {path:'',component:SlotsComponent},
    {path:'bookings',component:BookingsComponent},
    {path:'bookslot/:locationid',component:BookslotComponent}
  ]},
  children:[
    {path:'',component:AdminLoginComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
