// src/app/pages/course-list/course-list.page.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonicModule,
  LoadingController,
  AlertController
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,    // for *ngIf, *ngFor
    FormsModule,     // for ngModel (if you add a search bar later)
    IonicModule      // makes <ion-*> components available
  ],
  templateUrl: './course-list.page.html',
  styleUrls: ['./course-list.page.scss'],
})
export class CourseListPage implements OnInit {
  public courses: Course[] = [];
  public pageNumber = 0;
  public pageSize = 20;
  public hasNext = false;
  public isLoading = false;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadCourses();
  }

  private async loadCourses(event?: any) {
    this.isLoading = true;

    const loading = await this.loadingCtrl.create({
      message: 'Loading courses…',
    });
    await loading.present();

    // Adjust this call to match your actual CourseService signature.
    // The example below assumes filterCourses returns { data, hasNext }.
    this.courseService
      .filterCourses(this.pageNumber, this.pageSize)
      .subscribe({
        next: (res) => {
          this.courses.push(...res.data);
          this.hasNext = res.hasNext;
          this.isLoading = false;
          loading.dismiss();

          if (event) {
            event.target.complete();
          }
        },
        error: async (err) => {
          console.error('Error fetching courses:', err);
          this.isLoading = false;
          loading.dismiss();
          if (event) {
            event.target.complete();
          }
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Could not load courses. Please try again.',
            buttons: ['OK'],
          });
          await alert.present();
        },
      });
  }

  public loadMore(event: any) {
    this.pageNumber++;
    this.loadCourses(event);
  }

  public viewDetail(course: Course) {
    this.router.navigate(['/course-detail', course.id]);
  }

  public addCourse() {
    this.router.navigate(['/course-detail', 'new']);
  }
}
