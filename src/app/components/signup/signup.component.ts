import { Component, OnInit } from '@angular/core';
import { SignupRequestPayload } from './signup-request.payload';
import { AuthService } from '../../services/auth.service';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup;
  signupRequestPayload : SignupRequestPayload;

  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) {
    this.signupRequestPayload = {
      username: '',
      password: '',
      email: ''
    }
   }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }
  get email(){ return this.signupForm.get('email')}
  get username(){ return this.signupForm.get('username')}
  get password(){ return this.signupForm.get('password')}

  signup(){
    this.signupRequestPayload.email = this.email.value;
    this.signupRequestPayload.username = this.username.value;
    this.signupRequestPayload.password = this.password.value;

    this.authService.signup(this.signupRequestPayload).subscribe(
      data => {
        this.router.navigate(['/login'], {queryParams: {registered: 'true'}});
      }, () => {
        this.toastr.error('Registration failed! please try again');
      }
    );
  }
}
