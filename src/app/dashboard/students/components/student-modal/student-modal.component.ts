import { DialogRef} from '@angular/cdk/dialog';
import { Component, Inject} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../../../../core/models/student.model';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.scss']
})

export class StudentModalComponent  {

firstNameControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
lastNameControl = new FormControl('', [Validators.required,Validators.minLength(2)] );
emailControl = new FormControl('', [Validators.required, Validators.email]);
isActiveToogle = new FormControl(false);

studentForm = new FormGroup({
  firstName: this.firstNameControl,
  lastName: this.lastNameControl,
  email: this.emailControl,
  isActive: this.isActiveToogle,

})

constructor(private readonly dialogRef: DialogRef, @Inject(MAT_DIALOG_DATA) public data: Student | null) {
  if (data) {
    this.firstNameControl.setValue(data.firstName);
    this.lastNameControl.setValue(data.lastName);
    this.emailControl.setValue(data.email);
    this.isActiveToogle.setValue(data.isActive);
    
   
  }
 }



close() {
  this.dialogRef.close();
}



}