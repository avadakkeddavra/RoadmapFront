import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {GuestGuard} from './guards/guest.guard';
import {ProfileComponent} from './components/profile/profile.component';
import {LogsComponent} from './components/logs/logs.component';
import {SkillLogsComponent} from './components/skill-logs/skill-logs.component';
import {MatchingComponent} from './components/matching/matching.component';

const routes: Routes = [
  { path: '', component:DashboardComponent },
  { path: 'profile/:id', component:ProfileComponent },
  { path: 'user/:user_id/logs/:id', component:LogsComponent },
  { path: 'logs', component:SkillLogsComponent },
  { path: 'match', component: MatchingComponent },
];

const Auth: Routes = [
  { path: '', children: routes, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate:[GuestGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(Auth)],
  exports: [RouterModule],
})
export class FeaturedRoutes {}
