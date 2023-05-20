import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationsPageComponent } from './pages/registrations-page/registrations-page.component';
import { RegistrationModalComponent } from './components/registration-modal/registration-modal.component';
import { RegistrationModalDescriptionComponent } from './components/registration-modal-description/registration-modal-description.component';
import { MyMaterialModule } from 'src/app/shared/modules/my-material.module';
import { RegistrationsRoutingModule } from './registrations-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RegistrationsPageComponent,
    RegistrationModalComponent,
    RegistrationModalDescriptionComponent
  ],
  imports: [
    CommonModule,
    MyMaterialModule,
    RegistrationsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RegistrationsModule { }