import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './featured/guards/auth.guard';


const routes: Routes = [
  {path: '', loadChildren: './featured/featured.module#FeaturedModule'},
];

const Auth: Routes = [
  {path: '', children:routes, canActivate:[AuthGuard]},
];
@NgModule({
  imports: [RouterModule.forRoot(Auth)],
  exports: [RouterModule],
})
export class AppRouting {}

