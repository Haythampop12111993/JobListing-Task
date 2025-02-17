import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {
  path: "", redirectTo:"home",pathMatch: "full"
},
{path:"home",component:HomeComponent,title:"JobListing"},
{path:"jobDetails",component:JobDetailsComponent,title:"JobDetails"},
{path:"login",loadComponent:()=>import("./components/login/login.component").then(c=>c.LoginComponent),title:"Login"},
{path:"register",loadComponent:()=>import("./components/register/register.component").then(c=>c.RegisterComponent),title:"Register"},
// {path:"**",redirectTo:"home",pathMatch:"full"}
{path:"**",component:NotFoundComponent,title:"NotFound"}
];
