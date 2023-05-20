import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from '../../services/courses.service';
import { CourseModalComponent } from '../../components/course-modal/course-modal.component';
import { CourseModalDescriptionComponent } from '../../components/course-modal-description/course-modal-description.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { createCourse, deleteCourse, loadCourses, resetCourseState, updateCourse } from '../../store/course.actions';
import { selectCourseState } from '../../store/course.selectors';
import { Course } from 'src/app/core/models/course.model';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/core/models/app-state.model';
import { authenticatedUserSelector } from 'src/app/auth/store/auth.selectors';


@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  isAdmin = true;
  public user: Observable<User | null>
  displayedColumns = ['courseCode','name','isActive', 'edit', 'delete', 'description']
  public hover: number = 0;
  courses: Course[] = [] 
  loading = true;


  constructor(private store: Store, private readonly storeState: Store<AppState>, private readonly dialogService: MatDialog, private coursesService: CoursesService) {
    this.store.dispatch(loadCourses());
    this.user = this.storeState.select(authenticatedUserSelector)
   }
  ngOnDestroy(): void {
    this.store.dispatch(resetCourseState())
  }

  ngOnInit(): void {

  this.store.select(selectCourseState)
  .subscribe((state) => {
    this.courses = state.data
    this.loading = state.loading
  })

  this.user.subscribe((user) => {
    if (user) {
      
      if (user.rol !== 'admin') {
        this.isAdmin = false;
        this.displayedColumns = ['courseCode','name', 'description']
      }
    }
  })
   
  }

  
    addCourseToAPI(){
      const dialog = this.dialogService.open(CourseModalComponent)
      dialog.afterClosed().subscribe((course) => {
        if (course) {
               
                this.store.dispatch(createCourse({course}))
        }
      
      })
    } 

 
    editCourseFromAPI(element: Course) {
      const dialog = this.dialogService.open(CourseModalComponent, {
        data: element
      })
      dialog.afterClosed().subscribe((course) => {
        if (course) {
          this.store.dispatch(updateCourse(
            {
              course,
              id: element.id
             
            }
          ))

        }
      })
    }

    // Delete Course using Redux Store

    deleteCourseFromAPI(id: number){
      this.store.dispatch(deleteCourse({id}));
    
    }

   

    
    openDescription(element: Course){
      const dialog = this.dialogService.open(CourseModalDescriptionComponent, {
        data: element
      })
      dialog.afterClosed().subscribe((data) => {
        if (data) {
          this.coursesService.editCourseFromAPI(element.id, data)

        }
        // Subscribe to refresh table after editing data
        this.coursesService.getCoursesFromAPI().subscribe((resp) => {
       /*    this.loadAll(); */
        });
      })
    }

    changeActive(course: Course) {
      this.coursesService.changeActive(course)
    }

    showDescriptionCourse(course: Course) {
      this.dialogService.open(CourseModalDescriptionComponent, {
        data: course
      })
        
    }
    

}




