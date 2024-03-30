import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import Course from '../types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  course: any;
  courseId: string | null = null;
  isOwner: boolean = false;
  isGuest: boolean = true;
  userId: string = '';
  salesCount: number = 0;
  hasCurrentUserAlreadyBought: boolean = false;
  errorMessage: string = '';
  isModalVisible: boolean = false;

  constructor(
    private coursesServices: CoursesService,
    private rout: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkUser();

    this.courseId = this.rout.snapshot.paramMap.get('id');
    this.coursesServices.getOneCourse(this.courseId).subscribe((data) => {
      this.course = data as Course;
      this.isOwner = this.course._ownerId === this.userId;
    });

    this.getBuyCount();
    this.getHasCurrentUserAlreadyBought();
  }

  handelDelete(): void {
    this.isModalVisible = true;
  }

  handleConfirm(confirmation: boolean) {
    const courseId = this.rout.snapshot.paramMap.get('id');

    if (confirmation) {
      this.coursesServices.deleteCourse(courseId).subscribe(
        () => {
          this.router.navigate(['/catalog']);
        },
        (error) => {
          this.isModalVisible = false;
          if ((error.error.code = 403)) {
            this.errorMessage =
              "You don't nave permission to delete this course";
          } else {
            this.errorMessage = error.error.message;
          }
        }
      );
    }
    this.isModalVisible = false;
  }

  handleBuy(): void {
    const courseId = this.rout.snapshot.paramMap.get('id');
    this.coursesServices.buyCourse(courseId).subscribe(() => {
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl(currentUrl);
      });
    });
  }

  checkUser() {
    if (localStorage.getItem('user')) {
      this.userId = JSON.parse(localStorage.getItem('user')!)._id;
      this.isGuest = false;
    }
  }

  getBuyCount() {
    const courseId = this.rout.snapshot.paramMap.get('id');

    this.coursesServices.getCourseSales(courseId).subscribe((v) => {
      this.salesCount = v.length;
    });
  }

  getHasCurrentUserAlreadyBought() {
    const courseId = this.rout.snapshot.paramMap.get('id');

    this.coursesServices.getHasAlreadyBought(courseId!).subscribe((v) => {
      this.hasCurrentUserAlreadyBought = v.length > 0 ? true : false;
    });
  }
}
