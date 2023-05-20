import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { MyMaterialModule } from 'src/app/shared/modules/my-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    LoginPageComponent

  ],
  imports: [
    CommonModule,
    MyMaterialModule,
    ReactiveFormsModule,
    SharedModule

 
  ]
})
export class PagesAuthModule { }