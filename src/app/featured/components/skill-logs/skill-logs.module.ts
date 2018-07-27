import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SkillLogsComponent} from './skill-logs.component';
import {MaterializeModule} from 'angular2-materialize';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    FormsModule
  ],
  declarations: [SkillLogsComponent]
})
export class SkillLogsModule { }
