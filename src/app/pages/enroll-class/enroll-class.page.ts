import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, AlertController, ToastController } from '@ionic/angular';

import { CourseDto, RespSlice } from '../../models/models';
import { CourseService } from '../../services/course.service';
import { EnrollmentService, Enrollment } from '../../services/enrollment.service';

@Component({
  selector: 'app-enroll-class',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './enroll-class.page.html',
  styleUrls: ['./enroll-class.page.scss']
})
export class EnrollClassPage implements OnInit {
  courses: CourseDto[] = [];
  enrolledIds = new Set<number>();
  studentId: number | null = null;

  constructor(
    private courseSvc: CourseService,
    private enrollSvc: EnrollmentService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    const idStr = localStorage.getItem('userId');
    if (idStr) {
      this.studentId = Number(idStr);
    }
  }

  async ngOnInit() {
    if (this.studentId == null) {
      // nothing to load until you set localStorage.setItem('userId','1')
      return;
    }
    const loader = await this.loadingCtrl.create({ message: 'Loading…' });
    await loader.present();

    this.enrollSvc.listByStudent(this.studentId).subscribe({
      next: enrs => {
        enrs.forEach(e => this.enrolledIds.add(e.courseId));
        this.courseSvc.filterCourses(0, 100).subscribe({
          next: (resp: RespSlice<CourseDto>) => {
            this.courses = resp.dataSlice.content;
            loader.dismiss();
          },
          error: () => loader.dismiss()
        });
      },
      error: () => loader.dismiss()
    });
  }

  async enroll(course: CourseDto) {
    if (this.studentId == null) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'No user logged in (set localStorage userId)',
        buttons: ['OK']
      });
      return alert.present();
    }
    const courseId = course.id!;
    this.enrollSvc.enroll(this.studentId, courseId).subscribe({
      next: async () => {
        this.enrolledIds.add(courseId);
        const toast = await this.toastCtrl.create({
          message: `Enrolled in "${course.title}"!`,
          duration: 2000
        });
        toast.present();
      },
      error: async err => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: err.error?.message ?? 'Could not enroll',
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }

  isEnrolled(course: CourseDto): boolean {
    const courseId = course.id!;
    return this.studentId != null && this.enrolledIds.has(courseId);
  }
}
