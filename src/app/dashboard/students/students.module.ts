import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsPageComponent } from './pages/students-page/students-page.component';
import { StudentsRoutingModule } from './students-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentModalComponent } from './components/student-modal/student-modal.component';
import { StudentModalDescriptionComponent } from './components/student-modal-description/student-modal-description.component';
import { MyMaterialModule } from 'src/app/shared/modules/my-material.module';
import { FullnamePipePipe } from './components/student-modal-description/fullname-pipe.pipe';



@NgModule({
  declarations: [
    StudentsPageComponent,
    StudentModalComponent,
    StudentModalDescriptionComponent,
    FullnamePipePipe

  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MyMaterialModule
    
  ]
})
export class StudentsModule { }