import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  searchForm: FormGroup;
  searchQueryValue:string='';
  courses: any | null = null;
  offset: number = 0;
  pageSize: number = 6;
  currentPage = 0;
  isSelectedLatest: boolean = false;
  isSelectedHightToLow: boolean = false;
  isSelectedLowToHeight: boolean = false;

  constructor(private coursesServices: CoursesService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchQuery: ['']
    })
  }

  ngOnInit(): void {
    this.pageInfo();
  }

  pageInfo() {
    return this.coursesServices
      .getCurrentPageCourses(
        this.offset,
        this.pageSize,
        this.isSelectedLatest,
        this.isSelectedHightToLow,
        this.isSelectedLowToHeight,
        this.searchQueryValue
      )
      .subscribe((data) => {
        this.courses = data;
      });
  }

  search() {
    this.searchQueryValue = this.searchForm.get('searchQuery')?.value;
    this.pageInfo();
  }

  clickPreviousBtn() {
    this.currentPage -= 1;
    this.offset = this.currentPage * this.pageSize;
    this.pageInfo();
  }

  clickNextBtn() {
    this.currentPage += 1;
    this.offset = this.currentPage * this.pageSize;
    this.pageInfo();
  }

  clickLatest() {
    this.isSelectedHightToLow = false;
    this.isSelectedLowToHeight = false;
    this.isSelectedLatest = !this.isSelectedLatest;
    this.pageInfo();
  }

  clickHightToLow() {
    this.isSelectedLowToHeight = false;
    this.isSelectedLatest = false;
    this.isSelectedHightToLow = !this.isSelectedHightToLow;
    this.pageInfo();
  }

  clickLowToHight() {
    this.isSelectedHightToLow = false;
    this.isSelectedLatest = false;
    this.isSelectedLowToHeight = !this.isSelectedLowToHeight;
    this.pageInfo();
  }
}
