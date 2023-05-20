import { createReducer, on } from '@ngrx/store';
import { Course } from 'src/app/core/models/course.model';
import * as CourseActions from './course.actions';

export const courseFeatureKey = 'course';

export interface State {
data: Course[];
loading: boolean;
error: unknown;
}

export const initialState: State = {
data: [],
loading: false,
error: null
};

export const reducer = createReducer(
  initialState,

  on(CourseActions.loadCourses, state => {
    return {
      ...state,
      loading: true,
     
    }
  }),
  on(CourseActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      data: action.data
    }
  }),
  on(CourseActions.loadCoursesFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),

  on(CourseActions.createCourse, (state) => {
    return {
      ...state,
      loading: true,
     
    }
  }),

  on(CourseActions.createCourseSuccess, (state, action) => ({
    ...state,
    loading: false,
    data: [...state.data, action.course]
    
  })),
  on(CourseActions.createCourseFailure, (state, action) => ({
    ...state,
    loading: false,
  })),

  on(CourseActions.resetCourseState, () => (initialState)),

  // Reducers for deleteCourse

  on(CourseActions.deleteCourse, (state) => {
    return {
      ...state,
      loading: true,   
    }
  }),

  on(CourseActions.deleteCourseSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      data: state.data.filter(course => course.id !== action.id)
    }
  }),

  on(CourseActions.deleteCourseFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),

  // Reducers for updateCourse

  on(CourseActions.updateCourse, (state) => {
    return {
      ...state,
      loading: true,
     
    }
  }),

  on(CourseActions.updateCourseSuccess, (state, action) => {    
    return {
      ...state,
      loading: false,
      data: state.data.map(course => {
        if (course.id === action.course.id) {
          return action.course;
        }
        return course;
      })
    }
  }),

  on(CourseActions.updateCourseFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  })

);