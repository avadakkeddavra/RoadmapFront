import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoadmapComponent } from './roadmap.component';
import {SharedModule} from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [RoadmapComponent]
})
export class RoadmapModule { }
