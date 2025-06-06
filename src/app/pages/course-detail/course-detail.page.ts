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

  // ← Must import these modules so that <ion-*> tags and directives like *ngIf, *ngFor, [(ngModel)] work:
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],

  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss']
})
export class CourseDetailPage implements OnInit {
  public courseId!: number;
  public course: Course | null = null;
  public isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // Grab the “id” from the URL
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCourse();
  }

  private async loadCourse() {
    this.isLoading = true;

    const loading = await this.loadingCtrl.create({
      message: 'Loading course details…'
    });
    await loading.present();

    this.courseService.getCourseById(this.courseId).subscribe({
      next: (res) => {
        this.course = res;
        this.isLoading = false;
        loading.dismiss();
      },
      error: async (err) => {
        console.error('Error fetching course detail:', err);
        this.isLoading = false;
        await loading.dismiss();

        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Could not load course details. Please try again.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}
