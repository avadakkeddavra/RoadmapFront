import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent }   from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PaginationComponent } from './pagination/pagination.component';
import {RouterModule} from '@angular/router';
import {SkillsTableComponent} from './skills-table/skills-table.component';
import { ErrorsComponentComponent } from './errors-component/errors-component.component';
import {MaterializeModule} from 'angular2-materialize';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterializeModule
  ],
  declarations: [NavbarComponent, SidebarComponent, PaginationComponent, SkillsTableComponent, ErrorsComponentComponent],
  exports: [NavbarComponent, SidebarComponent, PaginationComponent, SkillsTableComponent, ErrorsComponentComponent]
})
export class SharedModule { }
