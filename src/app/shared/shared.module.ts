import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PaginationComponent } from './pagination/pagination.component';
import {RouterModule} from '@angular/router';
import {SkillsTableComponent} from './skills-table/skills-table.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NavbarComponent, SidebarComponent, PaginationComponent, SkillsTableComponent],
  exports: [NavbarComponent, SidebarComponent, PaginationComponent, SkillsTableComponent]
})
export class SharedModule { }
