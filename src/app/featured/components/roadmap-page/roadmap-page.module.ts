import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoadmapPageComponent } from './roadmap-page.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterializeModule,
    FormsModule
  ],
  declarations: [RoadmapPageComponent]
})
export class RoadmapPageModule { }
