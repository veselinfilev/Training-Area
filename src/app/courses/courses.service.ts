import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  URL = 'http://localhost:3030/data/courses';
  pageInfo: string = '';
  sortParams: string = '?';
  searchParams:string='';

  constructor(private http: HttpClient) {}

  getCourses() {
    return this.http.get(this.URL);
  }

  getOneCourse(courseId: string | null) {
    return this.http.get(`${this.URL}/${courseId}`);
  }

  getCurrentPageCourses(
    offset: number,
    pageSize: number,
    latest: boolean,
    hightToLow: boolean,
    lowToHeight: boolean,
    searchValue:string
  ) {

    if (latest) {
      this.sortParams = '?sortBy=_createdOn desc&';
    } else if (hightToLow) {
      this.sortParams = '?sortBy=price desc&';
    } else if (lowToHeight) {
      this.sortParams = '?sortBy=price&';
    } else {
      this.sortParams = '?';
    }

    this.searchParams = `&where=title LIKE "${searchValue}" OR lecture LIKE "${searchValue}"`

    this.pageInfo = `offset=${offset}&pageSize=${pageSize}`;

    return this.http.get(`${this.URL}${this.sortParams}${this.pageInfo}${this.searchParams}`);
  }
}
