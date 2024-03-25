import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../courses.service';
import { Router } from '@angular/router';
import Course from '../types';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  createForm: FormGroup;

  constructor(private fb: FormBuilder, private coursesService:CoursesService,private router:Router) {
    this.createForm = this.fb.group({
      title: ['', [Validators.required,Validators.minLength(6)]],
      lecture: ['', [Validators.required]],
      description: ['', [Validators.required,Validators.minLength(10)]],
      price: ['', [Validators.required,Validators.min(1)]],
      image: ['', [Validators.required,Validators.pattern('^https?:\/\/.*$')]],
      duration: ['', [Validators.required,Validators.min(1)]],
    });
  }

  onSubmit() {
    const { title, lecture, description, price, image, duration } = this.createForm.value;

    this.coursesService.createCourse(title, lecture, description, price, image, duration).subscribe((response)=>{
      const data = response as Course;
      this.router.navigate([`/details/${data._id}`])
    },error=>{
      alert(error)
    })
    
  }
}
