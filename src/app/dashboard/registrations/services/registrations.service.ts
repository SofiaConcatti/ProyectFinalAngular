import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.registrations';
import { Registration } from 'src/app/core/models/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsService {

  private registrations = new BehaviorSubject<Registration[]>([]);
  

  public registrations$: Observable<Registration[]>;
  constructor(private httpClient: HttpClient) { 
    this.registrations$ = this.registrations.asObservable();
  }

  getRegistrationsFromAPI(): Observable<Registration[]> {
    return this.httpClient.get<Registration[]>(`${environment.URLbase}registrations`);
  }

  
  deleteRegistrationFromAPI(id: number){
   
    return this.httpClient.delete(`${environment.URLbase}registrations/${id}`)    
  }

  addRegistrationToAPI (newRegistrationData:Omit<Registration, 'id' | 'isActive'>): void {
    const registrationsFromAPI = this.getRegistrationsFromAPI();
    registrationsFromAPI.pipe(take(1)).subscribe((registrations) => {
      const lastId = registrations[registrations.length - 1]?.id || 0;

      // Convert the date format into dd/mm/yyyy
      let dateString = newRegistrationData.date;
      let date = new Date(dateString);
      let day = date.getDate().toString().padStart(2,'0');
      let month = (date.getMonth() + 1).toString().padStart(2,'0');
      let year = date.getFullYear();
      let newDate = `${day}/${month}/${year}`;
      
      this.httpClient.post<Registration[]>(`${environment.URLbase}registrations`, new Registration(lastId + 1, newRegistrationData.registrationCode, newRegistrationData.studentFullName, newRegistrationData.courseName,  newDate)).subscribe((resp) => {
        
      })
    } 
    )
  }

  editRegistrationFromAPI(id: number, data:Partial<Registration>): void {
    const registrationsFromAPI = this.getRegistrationsFromAPI();
    registrationsFromAPI.pipe(take(1)).subscribe((registrations) => {
      this.registrations.next(registrations.map((r) => r.id === id ? {...r, ...data} : r))
      
  
    })
    this.httpClient.put<Registration[]>(`${environment.URLbase}registrations/${id}`, data).subscribe((resp) => {
      console.log(resp);
    })
    
  }

  changeActive(registration: Registration): void {
    this.registrations.pipe(take(1)).subscribe((registrations) => {
      this.registrations.next(registrations.map((r) => {
        if (r.id === registration.id) {
          return new Registration(r.id, r.studentFullName, r.courseName, r.registrationCode, r.date)
        }
        return r
      }))
    })
  }

}







  



