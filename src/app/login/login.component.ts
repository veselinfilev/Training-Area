import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage:string = '';

  constructor(private fb: FormBuilder, private authService: AuthService,private router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authService.login(email, password).subscribe(v=>{
      const { accessToken, email, username, _id  } = v;
      
      localStorage.setItem('user',JSON.stringify({accessToken, email, username, _id}));
      this.router.navigate(['/'])
      
    },error =>{
      if(error.error.message=== 'Login or password don\'t match'){
        this.errorMessage = 'Email or password don\'t match'
      }else{
        this.errorMessage = error.error.message;
      }
    })
  }
}
