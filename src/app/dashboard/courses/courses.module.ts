import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseModalComponent } from './components/course-modal/course-modal.component';
import { CourseModalDescriptionComponent } from './components/course-modal-description/course-modal-description.component';
import { MyMaterialModule } from 'src/app/shared/modules/my-material.module';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './store/course.effects';
import { StoreModule } from '@ngrx/store';
import { courseFeatureKey, reducer } from './store/course.reducer';


@NgModule({
  declarations: [
    CoursesPageComponent,
    CourseModalComponent,
    CourseModalDescriptionComponent,
  

  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MyMaterialModule,
    StoreModule.forFeature(courseFeatureKey,reducer),
    EffectsModule.forFeature([CourseEffects])
  ]
})
export class CoursesModule { }




