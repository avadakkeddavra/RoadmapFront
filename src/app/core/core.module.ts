import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from './services/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user.service';
import {SkillsService} from './services/skills.service';
import {HttpModule} from '@angular/http';
import {TokenInterceptor} from './token.interceptor';
import {CategoryService} from './services/catgory.service';
import {RoadmapService} from './services/roadmap.service';
import {CheckpointService} from './services/checkpoint.service';
import {TodoService} from './services/todo.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpModule
  ],
  declarations: [],
  providers: [
    AuthService,
    UserService,
    SkillsService,
    CategoryService,
    RoadmapService,
    CheckpointService,
    TodoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
