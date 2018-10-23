import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoadmapPageComponent } from './roadmap-page.component';
import { SharedModule } from '../../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MaterializeModule,
    FormsModule,
    EditorModule,
    DragulaModule.forRoot()
  ],
  declarations: [RoadmapPageComponent]
})
export class RoadmapPageModule { }
