import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  course: any;
  courseId: string | null = null;

  constructor(
    private coursesServices: CoursesService,
    private rout: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseId = this.rout.snapshot.paramMap.get('id');
    this.coursesServices.getOneCourse(this.courseId).subscribe((data) => {
      this.course = data;
    });
  }
}
