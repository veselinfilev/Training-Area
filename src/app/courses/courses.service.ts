import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  URL = 'http://localhost:3030/data/courses';
  BuyUrl = 'http://localhost:3030/data/buy';
  pageInfo: string = '';
  sortParams: string = '?';
  searchParams: string = '';

  constructor(private http: HttpClient) {}

  getAllCourses() {
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
    searchValue: string
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

    this.searchParams = `&where=title LIKE "${searchValue}" OR lecture LIKE "${searchValue}"`;

    this.pageInfo = `offset=${offset}&pageSize=${pageSize}`;

    return this.http.get(
      `${this.URL}${this.sortParams}${this.pageInfo}${this.searchParams}`
    );
  }

  deleteCourse(courseId: string | null) {
    let token = '';

    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')!).accessToken;
    }

    const headers = new HttpHeaders({ 'X-Authorization': token });

    return this.http.delete(`${this.URL}/${courseId}`, { headers });
  }

  createCourse(
    title: string,
    lecture: string,
    description: string,
    price: number,
    image: string,
    duration: number
  ) {
    let token = '';

    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')!).accessToken;
    }

    const body = { title, lecture, description, price, image, duration };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Authorization': token,
    });

    return this.http.post(this.URL, body, { headers });
  }

  editCourse(
    _id: string,
    title: string,
    lecture: string,
    description: string,
    price: number,
    image: string,
    duration: number
  ) {
    let token = '';

    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')!).accessToken;
    }

    const body = { _id, title, lecture, description, price, image, duration };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Authorization': token,
    });

    return this.http.put(`${this.URL}/${_id}`, body, { headers });
  }

  buyCourse(courseId: string | null) {
    let token = '';

    if (localStorage.getItem('user')) {
      token = JSON.parse(localStorage.getItem('user')!).accessToken;
    }

    const body = {courseId};

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Authorization': token,
    });

    return this.http.post(this.BuyUrl, body, { headers });
  }

  getBoughtCourses(): Observable<any[]> {
    let userId: string = '';

    if (localStorage.getItem('user')) {
      userId = JSON.parse(localStorage.getItem('user')!)._id;
    }

    const encodeUserId = encodeURIComponent(`="${userId}"`);
    const encodedCourses = encodeURIComponent('course=courseId:courses');

    return this.http.get<any[]>(`${this.BuyUrl}?where=_ownerId${encodeUserId}&load=${encodedCourses}`)

  }

  getCreatedCourses() {
    let userId: string = '';

    if (localStorage.getItem('user')) {
      userId = JSON.parse(localStorage.getItem('user')!)._id;
    }

    const encodeUserId = encodeURIComponent(`="${userId}"`);

    return this.http.get(`${this.URL}?where=_ownerId${encodeUserId}`);
  }

  getCourseSales(courseId:string | null): Observable<any[]>{
    const encodeWhereUrl = encodeURIComponent(`="${courseId}"`)

   return this.http.get<any[]>(`${this.BuyUrl}?where=courseId${encodeWhereUrl}`)
    
  }
}
