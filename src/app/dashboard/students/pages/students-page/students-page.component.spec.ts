import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentsPageComponent } from './students-page.component';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentsService } from '../../services/students.service';
import { StudentsServiceMock } from 'src/app/mocks/students.service.mock';
import {MatMenuModule} from '@angular/material/menu'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MyMaterialModule } from 'src/app/shared/modules/my-material.module';
describe('StudentsPageComponent', () => {
  let component: StudentsPageComponent;
  let fixture: ComponentFixture<StudentsPageComponent>;
  let studentsService: StudentsService;
  let spyCreateStudent: jasmine.Spy;
  let spyLoadStudents: jasmine.Spy;
  let spyDeleteStudent: jasmine.Spy;
  let spyEditStudent: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        StudentsPageComponent

       ],
      imports: [
        HttpClientTestingModule,
        MyMaterialModule

      ],
      providers: [
        MatDialog,
        MatDialogModule,
        MatMenuModule,
        MatAutocompleteModule,
        {
          provide: StudentsService,
          useClass: StudentsServiceMock
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsPageComponent);
    component = fixture.componentInstance;
    studentsService = TestBed.inject(StudentsService)
    spyLoadStudents = spyOn(studentsService, 'getStudentsFromAPI').and.callThrough();
    spyCreateStudent = spyOn(studentsService, 'addStudentToAPI').and.callThrough();
    spyDeleteStudent = spyOn(studentsService, 'deleteStudentFromAPI').and.callThrough();
    spyEditStudent = spyOn(studentsService, 'editStudentFromAPI').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load students at start', () => {
    component.ngOnInit();
    expect(spyLoadStudents).toHaveBeenCalled();

  });
 /*  it ('should delete a student', () => {
    component.deleteStudentFromAPI(1);
    expect(spyDeleteStudent).toHaveBeenCalled();
  }) */
 /*   it('should create a student', () => {
    component.addStudentToAPI();
    expect(spyCreateStudent).toHaveBeenCalled();
  
  }) */
});