import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsComponent} from './settings.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterializeModule} from 'angular2-materialize';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MaterializeModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
