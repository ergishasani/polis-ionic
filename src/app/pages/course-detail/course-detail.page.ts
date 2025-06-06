// src/app/pages/course-detail/course-detail.page.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonicModule,
  LoadingController,
  AlertController
} from '@ionic/angular';

import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    CommonModule, // For *ngIf, *ngFor
    FormsModule,  // For ngModel if needed
    IonicModule   // For <ion-*> tags
  ],
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss']
})
export class CourseDetailPage implements OnInit {
  public course: Course | null = null;
  public isNew = false;
  public isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam === 'new') {
      // New course: set up empty object
      this.isNew = true;
      this.course = { id: 0, code: '', title: '' };
    } else {
      // Existing course: parse ID and load
      const id = Number(idParam);
      this.loadCourse(id);
    }
  }

  private async loadCourse(id: number) {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      message: 'Loading course details…'
    });
    await loading.present();

    this.courseService.getCourseById(id).subscribe({
      next: async (res: Course) => {
        this.course = res;
        this.isLoading = false;
        loading.dismiss();
      },
      error: async (err) => {
        console.error('Error fetching course detail:', err);
        this.isLoading = false;
        loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Could not load course details. Please try again.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  public saveCourse() {
    // TODO: implement create/update logic
    // Example:
    // if (this.isNew) {
    //   this.courseService.createCourse(this.course).subscribe(...)
    // } else {
    //   this.courseService.updateCourse(this.course).subscribe(...)
    // }
  }
}
