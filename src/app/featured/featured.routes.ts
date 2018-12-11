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
import {SkillsCategoriesComponent} from './components/skills-categories/skills-categories.component';
import {AdminGuard} from './guards/admin.guard';
import {SettingsComponent} from './components/settings/settings.component';
import {RoadmapComponent} from './components/roadmap/roadmap.component';
import { RoadmapPageComponent } from './components/roadmap-page/roadmap-page.component';
import { CreateRoadmapComponent } from './components/create-roadmap/create-roadmap.component';
import { RoadmapStatComponent } from './components/roadmap-stat/roadmap-stat.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user/:user_id/logs/:id', component: LogsComponent, canActivate: [AuthGuard] },
  { path: 'logs', component: SkillLogsComponent, canActivate: [AuthGuard] },
  { path: 'match', component: MatchingComponent, canActivate: [AuthGuard] },
];

const Auth: Routes = [
  { path: '', children: routes, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'skills-categories', component: SkillsCategoriesComponent, canActivate: [AdminGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  { path: 'roadmap', component: RoadmapComponent, canActivate: [AuthGuard]},
  { path: 'roadmaps/create', component: CreateRoadmapComponent, canActivate: [AuthGuard]},
  { path: 'roadmap-stats/:id', component: RoadmapStatComponent, canActivate: [AuthGuard]},
  { path: 'roadmap/:roadmap_id', component: RoadmapPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(Auth)],
  exports: [RouterModule],
})
export class FeaturedRoutes {}
