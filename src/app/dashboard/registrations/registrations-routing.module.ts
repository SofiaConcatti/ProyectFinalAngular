import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationsPageComponent } from './pages/registrations-page/registrations-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RegistrationsPageComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RegistrationsRoutingModule { }


