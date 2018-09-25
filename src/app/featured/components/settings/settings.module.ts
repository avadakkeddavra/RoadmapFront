import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsComponent} from './settings.component';
import {SharedModule} from '../../../shared/shared.module';
import {MaterializeModule} from 'angular2-materialize';
import {FormsModule} from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MaterializeModule,
    ImageCropperModule,
    RouterModule
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule { }
