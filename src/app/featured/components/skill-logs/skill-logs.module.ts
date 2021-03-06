import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SkillLogsComponent} from './skill-logs.component';
import {MaterializeModule} from 'angular2-materialize';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    FormsModule,
    SharedModule
  ],
  declarations: [SkillLogsComponent]
})
export class SkillLogsModule { }
