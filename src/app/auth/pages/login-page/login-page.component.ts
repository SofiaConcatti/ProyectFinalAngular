import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {  filter, take } from 'rxjs';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  rolTypes: string[] = [];
  public loading = false;
  
 public form = new FormGroup({
    email: new FormControl('michael.lawson@reqres.in', [Validators.required, Validators.email]),
    password: new FormControl('cityslicka', [Validators.required, Validators.minLength(10)]),
    rol: new FormControl('', [Validators.required])
  }) 
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  
  ) {
    this.rolTypes = this.authService.getRoles();
  }

  login() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true
    this.authService.login({
      email: this.form.get('email')?.value || '',
      password: this.form.get('password')?.value || '',
      rol: this.form.get('rol')?.value || '',
    })
    this.router.navigate(['dashboard', 'students'])
    this.authService.isAuthenticated$
      .pipe(filter((value) => value))
      .pipe(take(1))
      .subscribe((value) => {
        if (value) {
          this.router.navigate(['dashboard', 'students']);
        }
      });
      this.authService.setRol(
        this.form.get('rol')?.value || ''
      )
  }
}