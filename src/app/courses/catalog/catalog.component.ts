import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  courses: any | null = null;

  constructor(private coursesServices: CoursesService) {}

  ngOnInit(): void {
    this.coursesServices.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }
}
