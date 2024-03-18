import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  URL = 'http://localhost:3030/data/courses';

  constructor(private http: HttpClient) {}

  getCourses() {
    return this.http.get(this.URL);
  }

  getOneCourse(courseId: string | null) {
    return this.http.get(`${this.URL}/${courseId}`);
  }
}
