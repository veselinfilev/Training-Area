import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { CoursesService } from './courses/courses.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OwnerGuard implements CanActivate {
  constructor(private courseService: CoursesService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot) {
    const courseId = next.paramMap.get('id');

    return this.courseService.isOwner(courseId!).pipe(
      map((v) => {
        if (v.haveUser && v.isOwner) {
          return true;
        } else if (v.haveUser) {
          this.router.navigate(['/']);
          return false;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
