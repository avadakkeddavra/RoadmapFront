import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {MaterializeModule} from 'angular2-materialize';
import {SkillsCategoriesComponent} from './skills-categories.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MaterializeModule
  ],
  declarations: [SkillsCategoriesComponent]
})
export class SkillsCategoriesModule { }
