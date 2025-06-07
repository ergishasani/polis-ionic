// src/app/pages/course-list/course-list.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }       from '@angular/common';
import { IonicModule }        from '@ionic/angular';
import { RouterModule }       from '@angular/router';

import { CourseService, Course } from '../../services/course.service';

@Component({
  selector:    'app-course-list',
  templateUrl: './course-list.page.html',
  styleUrls:   ['./course-list.page.scss'],
  standalone:  true,
  imports:     [IonicModule, CommonModule, RouterModule],
})
export class CourseListPage implements OnInit {
  courses: Course[] = [];    // always defined
  loading = true;            // start true to show spinner
  page    = 0;
  size    = 20;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    console.log('CourseListPage initialized');
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.filterCourses(this.page, this.size).subscribe({
      next: resp => {
        console.log('got courses response:', resp);              // full payload
        console.log('  resp.data array:', resp.data);             // should be Course[]

        this.courses = resp.data;
        this.loading = false;
      },
      error: err => {
        console.error('Error fetching courses', err);
        this.loading = false;
      }
    });
  }
}
