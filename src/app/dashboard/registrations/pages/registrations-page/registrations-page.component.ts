import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Registration } from 'src/app/core/models/registration.model';
import { RegistrationsService } from '../../services/registrations.service';
import { RegistrationModalComponent } from '../../components/registration-modal/registration-modal.component';
import { RegistrationModalDescriptionComponent } from '../../components/registration-modal-description/registration-modal-description.component';
import { Observable } from 'rxjs';
import { DateAdapter } from '@angular/material/core';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/models/app-state.model';
import { authenticatedUserSelector } from 'src/app/auth/store/auth.selectors';



@Component({
  selector: 'app-registrations-page',
  templateUrl: './registrations-page.component.html',
  styleUrls: ['./registrations-page.component.scss']
})
export class RegistrationsPageComponent implements OnInit{
  isAdmin = true;
  public user: Observable<User | null>;
  displayedColumns = ['registrationCode', 'studentName', 'courseName','date', 'edit','delete', 'description']
  public hover: number = 0;
  registrations: Observable<Registration[]>;
 
  constructor(private readonly dialogService: MatDialog,
     private registrationsService: RegistrationsService,
     private dateAdapter: DateAdapter<Date>,
     private readonly store: Store<AppState>
     ) {
    this.dateAdapter.setLocale('en-GB');
    this.registrations = this.registrationsService.getRegistrationsFromAPI();
    this.user = this.store.select(authenticatedUserSelector)
   }

  ngOnInit(): void {
    this.loadAll(); 
    this.user.subscribe((user) => {
      if (user) {
        
        if (user.rol !== 'admin') {
          this.isAdmin = false;
          this.displayedColumns = ['registrationCode', 'studentName', 'courseName','date','description']
        }
      }
    })
    
   }

   private loadAll() {
    this.registrations = this.registrationsService.getRegistrationsFromAPI();
    
  }

  addRegistrationToAPI(){
    const dialog = this.dialogService.open(RegistrationModalComponent)
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.registrationsService.addRegistrationToAPI({registrationCode: data.registrationCode, studentFullName: data.studentFullName, courseName:data.courseName,date: data.date});
              
      }
      // Subscribe to refresh table after adding data
      this.registrationsService.getRegistrationsFromAPI().subscribe((resp) => {
        this.loadAll();
      })
    })
  } 

  editRegistrationFromAPI(element: Registration) {
    const dialog = this.dialogService.open(RegistrationModalComponent, {
      data: element
    })
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.registrationsService.editRegistrationFromAPI(element.id, data)

      }
      // Subscribe to refresh table after editing data
      this.registrationsService.getRegistrationsFromAPI().subscribe((resp) => {
        this.loadAll();
      });
    })
  }

  deleteRegistrationFromAPI(id: number){
    this.registrationsService.deleteRegistrationFromAPI(id).subscribe((resp) => {
      this.loadAll();
    })
  }

  openDescription(element: Registration){
    const dialog = this.dialogService.open(RegistrationModalDescriptionComponent, {
      data: element
    })
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.registrationsService.editRegistrationFromAPI(element.id, data)

      }
      // Subscribe to refresh table after editing data
      this.registrationsService.getRegistrationsFromAPI().subscribe((resp) => {
        this.loadAll();
      });
    })
  }

  
  showDescriptionRegistration(registration: Registration) {
    this.dialogService.open(RegistrationModalDescriptionComponent, {
      data: registration
    })
      
  }


}








