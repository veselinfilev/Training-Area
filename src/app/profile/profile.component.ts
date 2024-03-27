import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses/courses.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isClickedFirst: boolean = false;
  isClickedSecond: boolean = true;
  cardsInfo: any= [];
  constructor(private courseServices: CoursesService) {}

  ngOnInit(): void {
    this.courseServices.getCreatedCourses().subscribe((v) => {
      this.cardsInfo = v;
    });
  }

  onClick(ev: Event) {
    const target = ev.target as HTMLElement;

    if (target.className.includes('first')) {
      this.isClickedFirst = true;
      this.isClickedSecond = false;

      this.courseServices.getBoughtCourses().subscribe((v: any[]) => {
        this.cardsInfo = v.map(info => info.course  )
      })
    } else {
      this.isClickedSecond = true;
      this.isClickedFirst = false;

      this.courseServices.getCreatedCourses().subscribe((v) => {
        this.cardsInfo = v;
      });
    }
  }
}
