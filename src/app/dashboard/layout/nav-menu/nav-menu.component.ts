import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { authenticatedUserSelector } from 'src/app/auth/store/auth.selectors';
import { AppState } from 'src/app/core/models/app-state.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
public user: Observable<User | null>
isAdmin = true;
constructor(private readonly store: Store<AppState>) {
  this.user = this.store.select(authenticatedUserSelector)
 
}
ngOnInit(): void {
 
  this.user.subscribe((user) => {
    if (user) {
      
      if (user.rol !== 'admin') {
        this.isAdmin = false;
      }
    }
  })
}




}