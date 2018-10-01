import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoadmapComponent } from './roadmap.component';
import {SharedModule} from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgMasonryGridModule } from 'ng-masonry-grid'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    NgMasonryGridModule
  ],
  declarations: [RoadmapComponent]
})
export class RoadmapModule { }
