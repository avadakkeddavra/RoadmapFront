import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoadmapStatComponent } from './roadmap-stat.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [RoadmapStatComponent]
})
export class RoadmapStatModule { }
