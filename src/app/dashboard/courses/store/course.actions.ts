import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/core/models/course.model';


export const loadCourses = createAction(
  '[Course] Load Courses'
);

export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ data: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: any }>()
);

export const createCourse = createAction(
  '[Course] Create Course',
  props<{ course: Course }>()
);

export const createCourseSuccess = createAction(
  '[Course] Create Course Success',
  props<{ course: Course }>()
);

export const createCourseFailure = createAction(
  '[Course] Create Course Failure',
  props<{ error: any }>()
);

export const resetCourseState = createAction('[Course] Reset Course State');

// Actions for delete Course

export const deleteCourse = createAction(
  '[Course] Delete Course',
  props<{ id: number }>()
);

export const deleteCourseSuccess = createAction(
  '[Course] Delete Course Success',
  props<{ id: number }>()
);

export const deleteCourseFailure = createAction(
  '[Course] Delete Course Failure',
  props<{ error: any }>()
)

// Actions for update Course

export const updateCourse = createAction(
  '[Course] Update Course',
  props<{ id: number; course: Course}>(),
)

export const updateCourseSuccess = createAction(
  '[Course] Update Course Success',
  props<{ course: Course }>()
)

export const updateCourseFailure = createAction(
  '[Course] Update Course Failure',
  props<{ error: any }>()
)
