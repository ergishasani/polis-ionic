// src/app/pages/teacher-detail/teacher-detail.page.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { TeacherService } from '../../services/teacher.service';
import { TeacherDto, RespSingle, ServerStatus } from '../../models/models';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.page.html',
  styleUrls: ['./teacher-detail.page.scss'],
})
export class TeacherDetailPage implements OnInit {
  teacher: TeacherDto = {
    id: 0,
    firstName: '',
    lastName: '',
    title: '',
    courses: []
  };
  isNew = false;
  teacherId: number | null = null;
  isLoading = false;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    const extras = this.router.getCurrentNavigation()?.extras.state;
    this.isNew = extras?.['isNew'] ?? false;
    this.teacherId = extras?.['teacherId'] ?? null;
    if (!this.isNew && this.teacherId != null) {
      this.loadTeacher(this.teacherId);
    }
  }

  loadTeacher(id: number) {
    this.isLoading = true;
    this.teacherService.getTeacher(id).subscribe({
      next: (res: RespSingle<TeacherDto>) => {
        if (res.status?.length) {
          this.showStatusErrors(res.status);
          this.navCtrl.navigateBack(['/teacher-list']);
        } else if (res.data) {
          this.teacher = res.data;
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.presentToast('Error loading teacher');
        this.isLoading = false;
        this.navCtrl.navigateBack(['/teacher-list']);
      }
    });
  }

  saveTeacher() {
    this.isLoading = true;
    this.teacherService.upsertTeacher(this.teacher).subscribe({
      next: (res: RespSingle<TeacherDto>) => {
        if (res.status?.length) {
          this.showStatusErrors(res.status);
        } else {
          this.presentToast(this.isNew ? 'Created' : 'Updated');
        }
        this.isLoading = false;
        this.navCtrl.navigateBack(['/teacher-list']);
      },
      error: (err) => {
        console.error(err);
        this.presentToast('Error saving teacher');
        this.isLoading = false;
      }
    });
  }

  cancel() {
    this.navCtrl.navigateBack(['/teacher-list']);
  }

  private async showStatusErrors(statuses: ServerStatus[]) {
    for (const s of statuses) {
      await this.presentToast(`${s.code}: ${s.message}`);
    }
  }

  private async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
