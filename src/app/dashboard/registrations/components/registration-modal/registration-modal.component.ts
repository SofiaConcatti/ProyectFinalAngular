import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit, OnDestroy} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { Registration } from 'src/app/core/models/registration.model';
import { Student } from 'src/app/models/student.model';
import { StudentsService } from '../../../students/services/students.service';
import { Course} from 'src/app/models/course.model';
import { CoursesService } from '../../../courses/services/courses.service';
import { DateAdapter } from '@angular/material/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.scss'],
})
export class RegistrationModalComponent implements OnInit, OnDestroy {

 
  student!: Student;
  students!: Student[];
  studentSubscription!: Subscription;
  student$!: Observable<Student[]>;

  course!: Course;
  courses!: Course[];
  courseSubscription!: Subscription;
  course$!: Observable<Course[]>;


registrationCodeControl = new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(5),]);
dateControl = new FormControl('', Validators.required); 

    studentFullNameControl = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  }); 
  courseControl = new FormGroup({
    courseId: new FormControl('', Validators.required),
    courseName: new FormControl('', Validators.required),
  });  
  
  

 registrationForm = new FormGroup({
    registrationCode: this.registrationCodeControl,
    date: this.dateControl,
    studentFullName: this.studentFullNameControl,
    courseName: this.courseControl,

  });   


  constructor(
    private readonly dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: Registration | null,
    private studentService: StudentsService,
    private courseService: CoursesService,
    private dateAdapter: DateAdapter<Date>
    
  ) {
    this.dateAdapter.setLocale('en-GB');
    if (data) {
    
    this.registrationCodeControl.setValue(data.registrationCode);
    this.dateControl.setValue(data.date);
  
    // Save the values of a Form Group into one string
    let fullName: any;
    fullName = this.studentFullNameControl.value.firstName?.valueOf + ' ' + this.studentFullNameControl.value.lastName?.valueOf;
    data.studentFullName = fullName; 
    let fullDataCourse: any;
    fullDataCourse = this.courseControl.value.courseId?.valueOf + ' ' + this.courseControl.value.courseName?.valueOf; 
    data.courseName = fullDataCourse;
  
   
    }
  }

  getStudentsList () {
    this.student$ = this.studentService.getStudentsFromAPI();
    this.studentSubscription = this.student$.subscribe((students) => {
      this.students = students;
    });
  }

  getCoursesList () {
    this.course$ = this.courseService.getCoursesFromAPI();
    this.courseSubscription = this.course$.subscribe((courses) => {
      this.courses = courses;
    });
  }

  ngOnInit(): void {
    this.getStudentsList();
    this.getCoursesList();


  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.studentSubscription.unsubscribe();
    this.courseSubscription.unsubscribe();
  }
}