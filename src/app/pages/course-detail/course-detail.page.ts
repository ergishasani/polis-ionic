import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { IonicModule }       from '@ionic/angular';
import { CommonModule }      from '@angular/common';
import { CourseService }     from '../../services/course.service';
import { CourseDto }         from '../../models/models';

@Component({
  selector:    'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls:   ['./course-detail.page.scss'],
  standalone:  true,
  imports:     [IonicModule, CommonModule],
})
export class CourseDetailPage implements OnInit {
  course?: CourseDto;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : undefined;
    if (id !== undefined && !isNaN(id)) {
      this.loading = true;
      this.courseService.getCourseById(id).subscribe({
        next: (response) => {
          this.course = response.data;
          this.loading = false;
        },
        error: () => {
          this.course = undefined;
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }
}
