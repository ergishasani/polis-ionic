// src/app/pages/home/home.page.ts
import { Component, OnInit } from '@angular/core';
import { CourseService }      from '../../app/services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  constructor(private cs: CourseService) {}

  ngOnInit() {
    this.cs.filterCourses(0,5).subscribe({
      next: resp => console.log('=== got courses ===', resp),
      error: err  => console.error('=== error ===', err)
    });
  }
}
