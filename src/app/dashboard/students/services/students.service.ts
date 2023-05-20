import { Injectable } from '@angular/core';
import { Student } from '../../../core/models/student.model';
import { BehaviorSubject, Observable, take, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.students';

export interface IStudentsService {
  students$: Observable<Student[]>;
  getStudentsFromAPI(): void;
  deleteStudentFromAPI(id: number): void;
  addStudentToAPI(newStudentData: Omit<Student, 'id' | 'isActive'>): void;
  editStudentFromAPI(id: number, data:Partial<Student>): void  ;
}

@Injectable({
  providedIn: 'root'
})
export class StudentsService implements IStudentsService {
  private students = new BehaviorSubject<Student[]>([]);
  

  public students$: Observable<Student[]>;
  constructor(private httpClient: HttpClient) { 
    this.students$ = this.students.asObservable();
  }

  getStudentsFromAPI(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${environment.URLbase}api/students`);
  }


  deleteStudentFromAPI(id: number){
   
  return this.httpClient.delete(`${environment.URLbase}api/students/${id}`) 

     
    
  }

addStudentToAPI (newStudentData:Omit<Student, 'id' | 'isActive'>): void {
  const studentsFromAPI = this.getStudentsFromAPI();
  studentsFromAPI.pipe(take(1)).subscribe((students) => {
    const lastId = students[students.length - 1]?.id || 0;
    this.httpClient.post<Student[]>(`${environment.URLbase}api/students`, new Student(lastId + 1, newStudentData.firstName, newStudentData.lastName, newStudentData.email, true)).subscribe((resp) => {

    })
  } 
  )
}

editStudentFromAPI(id: number, data:Partial<Student>): void {
  const studentsFromAPI = this.getStudentsFromAPI();
  studentsFromAPI.pipe(take(1)).subscribe((students) => {
    this.students.next(students.map((s) => s.id === id ? {...s, ...data} : s))
    

  })
  this.httpClient.put<Student[]>(`${environment.URLbase}api/students/${id}`, data).subscribe((resp) => {
    console.log(resp);
  })
  
}

  changeActive(student: Student): void {
    this.students.pipe(take(1)).subscribe((students) => {
      this.students.next(students.map((s) => {
        if (s.id === student.id) {
          return new Student(s.id, s.firstName, s.lastName, s.email, !s.isActive)
        }
        return s
      }))
    })
  }

  getStudentById(id: number): Observable<Student | null> {
return this.students$.pipe(
  take(1),
  map((students) => students.find((s) => s.id === id) || null)
)
  }


}

  


