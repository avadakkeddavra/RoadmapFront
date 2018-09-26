import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoadmapsComponent } from './search-roadmaps.component';
import { SharedModule } from '../../../shared/shared.module';
import { MaterializeModule } from 'angular2-materialize';
import { NgMasonryGridModule } from 'ng-masonry-grid'

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterializeModule,
    NgMasonryGridModule
  ],
  declarations: [SearchRoadmapsComponent]
})
export class SearchRoadmapsModule { }
