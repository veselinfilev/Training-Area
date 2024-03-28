import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses/courses.service';

type User = {
  accessToken?: string;
  email: string;
  username: string;
  _id?: string;
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isClickedFirst: boolean = false;
  isClickedSecond: boolean = true;
  cardsInfo: any = [];
  userInfo: User = { username: 'Missing', email: 'Missing' };
  constructor(private courseServices: CoursesService) {}

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.userInfo = JSON.parse(localStorage.getItem('user')!);
      console.log(this.userInfo);
    }

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
        this.cardsInfo = v.map((info) => info.course);
      });
    } else {
      this.isClickedSecond = true;
      this.isClickedFirst = false;

      this.courseServices.getCreatedCourses().subscribe((v) => {
        this.cardsInfo = v;
      });
    }
  }
}
