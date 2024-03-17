import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  editForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      lecture: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(1)]],
      img: ['', [Validators.required, Validators.pattern('^https?://.*$')]],
      duration: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      console.log(this.editForm.value);
    }
  }
}
