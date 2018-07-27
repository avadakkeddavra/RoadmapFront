import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats/stats.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../../shared/shared.module';
import {MaterializeModule} from 'angular2-materialize';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterializeModule,
    FormsModule,
    RouterModule
  ],
  declarations: [StatsComponent, UsersTableComponent, DashboardComponent]
})
export class DashboardModule { }
