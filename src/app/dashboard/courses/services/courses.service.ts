import { Injectable } from '@angular/core';
import { Course } from '../../../core/models/course.model';
import { BehaviorSubject, Observable, take, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.courses';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courses = new BehaviorSubject<Course[]>([]);
  

  public courses$: Observable<Course[]>;
  constructor(private httpClient: HttpClient) { 
    this.courses$ = this.courses.asObservable();
  }

  
  getCoursesFromAPI(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${environment.URLbase}api/courses`);
  }


  deleteCourseFromAPI(id: number){
   
  return this.httpClient.delete(`${environment.URLbase}api/courses/${id}`)    
  }

  addCourseToAPI (newCourseData:Omit<Course, 'id' | 'isActive'>): void {
    const coursesFromAPI = this.getCoursesFromAPI();
    coursesFromAPI.pipe(take(1)).subscribe((courses) => {
      const lastId = courses[courses.length - 1]?.id || 0;
      this.httpClient.post<Course[]>(`${environment.URLbase}api/courses`, new Course(lastId + 1, newCourseData.courseCode, newCourseData.name, true)).subscribe((resp) => {
        console.log(resp);
      })
    } 
    )
  }

  
editCourseFromAPI(id: number, data:Partial<Course>): void {
  const coursesFromAPI = this.getCoursesFromAPI();
  coursesFromAPI.pipe(take(1)).subscribe((courses) => {
    this.courses.next(courses.map((c) => c.id === id ? {...c, ...data} : c))
    

  })
  this.httpClient.put<Course[]>(`${environment.URLbase}api/courses/${id}`, data).subscribe((resp) => {
    console.log(resp);
  })
  
}

changeActive(course: Course): void {
  this.courses.pipe(take(1)).subscribe((courses) => {
    this.courses.next(courses.map((c) => {
      if (c.id === course.id) {
        return new Course(c.id, c.courseCode, c.name, !c.isActive)
      }
      return c
    }))
  })
}


  
}



  


