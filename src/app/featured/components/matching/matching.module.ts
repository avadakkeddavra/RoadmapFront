import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatchingComponent} from './matching.component';
import {MaterializeModule} from 'angular2-materialize';
import {FormsModule} from '@angular/forms';
import {AmChartsModule} from '@amcharts/amcharts3-angular';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    FormsModule,
    AmChartsModule
  ],
  declarations: [MatchingComponent]
})
export class MatchingModule { }
