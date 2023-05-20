import { BehaviorSubject, Observable, take, mergeMap } from 'rxjs';
import { Student } from 'src/app/core/models/student.model';
import { IStudentsService } from '../dashboard/students/services/students.service';


const FAKE_STUDENTS: Student[] = [
  {
    id: 1,
    firstName: 'Juan',
    lastName: 'Perez',
    email: 'juan.perez@gmail.com',
    isActive: true
  },
  {
    id: 2,
    firstName: 'Maria',
    lastName: 'Gomez',
    email: 'maria.gomez@gmail.com',
    isActive: true
  },
  {
    id: 3,
    firstName: 'Pedro',
    lastName: 'Rodriguez',
    email: 'pedro.rodriguez@gmail.com',
    isActive: true
  }

]

export class StudentsServiceMock implements IStudentsService {
  private students = new BehaviorSubject<Student[]>([]);
  public students$: Observable<Student[]>;
  constructor() {
    this.students$ = this.students.asObservable();
  }
  getStudentsFromAPI(): void {
    this.students.next(FAKE_STUDENTS);
  }
  deleteStudentFromAPI(id: number): void {
    this.students.pipe(take(1)).subscribe((students) => {
      this.students.next(students.filter((s) => s.id !== id))
    })
  }
  addStudentToAPI(newStudentData: Omit<Student, "id" | "isActive">): void {
    this.students$
    .pipe(
      take(1)
      ).subscribe((currentStudents) => {
        const lastId = currentStudents[currentStudents.length - 1]?.id || 0;
        this.students.next([
          ...currentStudents,
          {
            id: lastId + 1,
            firstName: newStudentData.firstName,
            lastName: newStudentData.lastName,
            email: newStudentData.email,
            isActive: true
          }
        ])
      }

      )
    
    
  }
  editStudentFromAPI(id: number, data: Partial<Student>): void {
      this.students.pipe(take(1)).subscribe((students) => {
        this.students.next(students.map(
          (s) => s.id === id
          ? new Student (
            s.id,
            data.firstName || s.firstName,
            data.lastName || s.lastName,
            data.email || s.email,
            data.isActive || s.isActive
          )
          : s
        )
        )
        })
     
  
  }
 
}