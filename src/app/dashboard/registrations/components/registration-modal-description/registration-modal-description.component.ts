import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Registration } from 'src/app/core/models/registration.model';

@Component({
  selector: 'app-registration-modal-description',
  templateUrl: './registration-modal-description.component.html',
  styleUrls: ['./registration-modal-description.component.scss']
})
export class RegistrationModalDescriptionComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public registration: Registration) {
  

  }
}



