import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoadmapsComponent } from './search-roadmaps.component';
import { SharedModule } from '../../../shared/shared.module';
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterializeModule
  ],
  declarations: [SearchRoadmapsComponent]
})
export class SearchRoadmapsModule { }
