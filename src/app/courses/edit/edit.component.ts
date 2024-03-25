import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  courseId: string | null = null;
  course: any;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private rout: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6)]],
      lecture: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(1)]],
      image: ['', [Validators.required, Validators.pattern('^https?://.*$')]],
      duration: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.courseId = this.rout.snapshot.paramMap.get('id');
    this.coursesService.getOneCourse(this.courseId).subscribe((data) => {
      this.course = data;
      this.editForm.patchValue({
        title: this.course.title,
        lecture: this.course.lecture,
        description: this.course.description,
        price: this.course.price,
        image: this.course.image,
        duration: this.course.duration,
      });
    });
  }

  onSubmit() {
    const courseId = this.rout.snapshot.paramMap.get('id');
    const { title, lecture, description, price, image, duration } = this.editForm.value;
    this.coursesService
      .editCourse( courseId!, title, lecture, description, price, image, duration)
      .subscribe(
        () => {
          this.router.navigate([`details/${courseId}`]);
        },
        (error) => {
          alert(error);
        }
      );
  }
}
