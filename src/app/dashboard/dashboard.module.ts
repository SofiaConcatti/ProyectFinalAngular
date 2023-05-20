import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component'
import { PageWrapperComponent } from './layout/page-wrapper/page-wrapper.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MyMaterialModule } from '../shared/modules/my-material.module';
import { FooterComponent } from './layout/footer/footer.component';
import { MyProfileComponent } from './my-profile/my-profile.component';




@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    NavMenuComponent,
    PageWrapperComponent,
    FooterComponent,
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MyMaterialModule
  ]
})
export class DashboardModule { }