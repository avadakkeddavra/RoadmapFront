import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { TopSkillsComponent } from './top-skills/top-skills.component';
import { UserChartComponent } from './user-chart/user-chart.component';
import { BestMatchedComponent } from './best-matched/best-matched.component';
import {SharedModule} from '../../../shared/shared.module';
import {AmChartsModule} from '@amcharts/amcharts3-angular';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AmChartsModule
  ],
  declarations: [
    ProfileComponent,
    UserInfoComponent,
    TopSkillsComponent,
    UserChartComponent,
    BestMatchedComponent
  ]
})
export class ProfileModule { }
