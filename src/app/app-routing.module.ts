import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MovieDashboardComponent } from './movie-dashboard/movie-dashboard.component';


const routes: Routes = [
  { path  : '', redirectTo: '/login', pathMatch: 'full'},
  { path  : 'login', component : LoginComponent },
  { path  : 'dashboard', component : DashboardComponent,canActivate: [AuthGuard] },
  { path : 'movie-dashboard' , component : MovieDashboardComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
