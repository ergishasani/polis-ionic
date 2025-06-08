import { Component, OnInit } from '@angular/core';
import { NavController }     from '@ionic/angular';
import { IonicModule }       from '@ionic/angular';
import { CommonModule }      from '@angular/common';
import { RouterModule }      from '@angular/router';
import { CourseService }     from '../../services/course.service';
import { CourseDto }         from '../../models/models';

@Component({
  selector:    'app-course-list',
  templateUrl: './course-list.page.html',
  styleUrls:   ['./course-list.page.scss'],
  standalone:  true,
  imports:     [IonicModule, CommonModule, RouterModule],
})
export class CourseListPage implements OnInit {
  courses: CourseDto[] = [];
  page    = 0;
  size    = 20;
  filter  = '';
  loading = true;

  constructor(
    private courseService: CourseService,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.load();
  }

  private load() {
    this.loading = true;
    this.courseService
      .filterCourses(this.page, this.size, this.filter)
      .subscribe({
        next: resp => {
          this.courses = resp.dataSlice.content;
          this.loading = false;
        },
        error: () => {
          this.courses = [];
          this.loading = false;
        }
      });
  }

  onFilterChange(e: any) {
    this.filter = e.detail.value;
    this.page   = 0;
    this.load();
  }

  view(course: CourseDto) {
    this.nav.navigateForward(`/course-detail/${course.id}`);
  }
}
