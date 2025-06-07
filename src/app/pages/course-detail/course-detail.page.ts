// src/app/pages/course-detail/course-detail.page.ts
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseService, Course } from '../../services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class CourseDetailPage implements OnInit {
  course?: Course;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // Read "id" from the URL and convert to number
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam !== null ? Number(idParam) : NaN;

    // Fetch the course and unwrap resp.data
    this.courseService.getCourseById(id).subscribe({
      next: resp => {
        this.course = resp.data;
      },
      error: err => {
        console.error('Failed to load course', err);
      }
    });
  }
}
