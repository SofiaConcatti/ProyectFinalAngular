import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../../../../core/models/student.model';

@Component({
  selector: 'app-student-modal-description',
  templateUrl: './student-modal-description.component.html',
  styleUrls: ['./student-modal-description.component.scss']
})
export class StudentModalDescriptionComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public student: Student) {
  
  }
}

