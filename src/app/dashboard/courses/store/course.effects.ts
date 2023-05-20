import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as CourseActions from './course.actions';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment.courses';
import { Course } from 'src/app/core/models/course.model';



@Injectable()
export class CourseEffects {

private baseURL = environment.URLbase;

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(CourseActions.loadCourses),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getCoursesFromAPI().pipe(
          map(data => CourseActions.loadCoursesSuccess({ data })),
          catchError(error => of(CourseActions.loadCoursesFailure({ error }))))
      )
    );
  });

  createCourse$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(CourseActions.createCourse),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.createCourse(action.course).pipe(
          map((response) => CourseActions.createCourseSuccess({ course: response })),
          catchError(error => of(CourseActions.createCourseFailure({ error }))))
      )
    );
  });

  // Effects for delete Course

  deleteCourse$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(CourseActions.deleteCourse),
      concatMap((action) =>
        this.deleteCourse(action.id).pipe(
          map((response) => CourseActions.deleteCourseSuccess({ id: response })),
          catchError(error => of(CourseActions.deleteCourseFailure({ error }))))
      )
    );
  })

  // Effects for update Course

  updateCourse$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(CourseActions.updateCourse),
      concatMap((action) =>    
        this.updateCourse(action.course, action.id).pipe(
          map((response) => CourseActions.updateCourseSuccess({ course: response })),
          catchError(error => of(CourseActions.updateCourseFailure({ error }))))
      )
    );
  })


  constructor(private actions$: Actions, private HttpClient: HttpClient) {}

  private getCoursesFromAPI(): Observable<Course[]> {
    return this.HttpClient.get<Course[]>(`${this.baseURL}/courses`);

  }

  private createCourse(data: Course): Observable<Course> {
    return this.HttpClient.post<Course>(`${this.baseURL}/courses`, data);
  }

  private deleteCourse(id: number): Observable<number> {
    return this.HttpClient.delete<number>(`${this.baseURL}/courses/${id}`);
  }

  // Method for update Course

  private updateCourse(data: Course, id:number): Observable<Course> {
    return this.HttpClient.put<Course>(`${this.baseURL}/courses/${id}`, data);
  }
}