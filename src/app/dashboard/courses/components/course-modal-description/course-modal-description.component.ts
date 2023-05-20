import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../../../../core/models/course.model';

@Component({
  selector: 'app-course-modal-description',
  templateUrl: './course-modal-description.component.html',
  styleUrls: ['./course-modal-description.component.scss']
})
export class CourseModalDescriptionComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public course: Course) {

  }
}


