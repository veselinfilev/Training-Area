import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  createForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm = this.fb.group({
      title: ['', [Validators.required,Validators.minLength(6)]],
      lecture: ['', [Validators.required]],
      description: ['', [Validators.required,Validators.minLength(10)]],
      price: ['', [Validators.required,Validators.min(1)]],
      img: ['', [Validators.required,Validators.pattern('^https?:\/\/.*$')]],
      duration: ['', [Validators.required,Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.createForm.valid) {
      console.log(this.createForm.value);
    }
  }
}
