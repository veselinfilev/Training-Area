import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage:string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required, Validators.minLength(5)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('rePassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    const email = this.registerForm.get('email')?.value;
    const username = this.registerForm.get('username')?.value;
    const password = this.registerForm.get('password')?.value;

    this.authService.register(email, username, password).subscribe(
      (v) => {
        const { accessToken, email, username, _id  } = v;
        localStorage.setItem(
          'user',
          JSON.stringify({accessToken, email, username, _id})
        );
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }
}
