import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRoadmapComponent } from './create-roadmap.component';
import { SharedModule } from '../../../shared/shared.module';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterializeModule,
    FormsModule,
    RouterModule,
    CKEditorModule
  ],
  declarations: [CreateRoadmapComponent]
})
export class CreateRoadmapModule { }
