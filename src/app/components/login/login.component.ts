import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LoginRequestPayload } from './login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  isError: boolean = false;

  constructor(private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    }
   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.activatedRoute.queryParams.subscribe(
      params => {
        if(params.registered !== undefined && params.registered === 'true'){
          this.toastr.success('Signup Successful');
        }
      }
    )
  }
  get username(){ return this.loginForm.get('username')}
  get password(){ return this.loginForm.get('password')}

  login(){
    this.loginRequestPayload.username = this.username.value;
    this.loginRequestPayload.password = this.password.value;
    this.authService.login(this.loginRequestPayload).subscribe(
      data => {
        if(data){
          this.isError = false;
          this.router.navigateByUrl('/home');
          this.toastr.success('Login Successful');
        }else{
          this.isError = true;
        }
      }
    )
  }
}
