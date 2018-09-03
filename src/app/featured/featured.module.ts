import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardModule} from './components/dashboard/dashboard.module';
import {FeaturedRoutes} from './featured.routes';
import {LoginModule} from './components/login/login.module';
import {SharedModule} from '../shared/shared.module';
import {AuthService} from '../core/services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {GuestGuard} from './guards/guest.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {TokenInterceptor} from '../core/token.interceptor';
import {MaterializeModule} from 'angular2-materialize';
import {ProfileModule} from './components/profile/profile.module';
import {UserGuard} from './guards/user.guard';
import {LogsModule} from './components/logs/logs.module';
import {SkillLogsModule} from './components/skill-logs/skill-logs.module';
import {MatchingModule} from './components/matching/matching.module';
import {AdminGuard} from './guards/admin.guard';
import {SkillsCategoriesModule} from './components/skills-categories/skills-categories.module';

@NgModule({
  imports: [
    SkillLogsModule,
    CommonModule,
    DashboardModule,
    FeaturedRoutes,
    LoginModule,
    SharedModule,
    ProfileModule,
    MaterializeModule,
    LogsModule,
    MatchingModule,
    SkillsCategoriesModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    GuestGuard,
    UserGuard,
    AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  declarations: []
})
export class FeaturedModule { }
