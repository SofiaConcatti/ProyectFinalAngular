import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHelperComponent } from './components/error-helper/error-helper.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { MyMaterialModule } from './modules/my-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';





@NgModule({
  declarations: [

   ErrorHelperComponent,
    ThemeSwitcherComponent,
    NotFoundComponent,

  ],
  imports: [
    CommonModule,
    MyMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [

    ErrorHelperComponent,
    ThemeSwitcherComponent,
  ]
})
export class SharedModule { }