import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { CourseService, Course } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.page.html',
  styleUrls: ['./course-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class CourseListPage implements OnInit {
  courses: Course[] = [];
  loading = false;
  hasNext = false;
  page = 0;
  size = 20;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.courseService.filterCourses(this.page, this.size).subscribe({
      next: resp => {
        this.courses = resp.data;
        this.hasNext = resp.hasNext;
        this.loading = false;
      },
      error: err => {
        console.error('Error fetching courses', err);
        this.loading = false;
      }
    });
  }
}
