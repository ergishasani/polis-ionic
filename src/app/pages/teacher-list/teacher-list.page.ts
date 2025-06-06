import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { TeacherDto, RespSlice, ServerStatus } from '../../models/models';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.page.html',
  styleUrls: ['./teacher-list.page.scss'],
})
export class TeacherListPage implements OnInit {
  teachers: TeacherDto[] = [];
  searchTerm = '';
  pageNumber = 0;
  pageSize = 20;
  hasNext = false;
  isLoading = false;

  constructor(
    private teacherService: TeacherService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(event?: any) {
    this.isLoading = true;
    this.teacherService
      .filterTeachers(this.searchTerm, this.pageNumber, this.pageSize)
      .subscribe({
        next: (res: RespSlice<TeacherDto>) => {
          if (res.status?.length) {
            this.showStatusErrors(res.status);
            this.teachers = [];
            this.hasNext = false;
          } else {
            if (this.pageNumber === 0) {
              this.teachers = res.slice.content;
            } else {
              this.teachers = [...this.teachers, ...res.slice.content];
            }
            this.hasNext = res.slice.hasNext;
          }
          this.isLoading = false;
          event?.target.complete();
        },
        error: (err) => {
          console.error(err);
          this.presentToast('Error loading teachers');
          this.isLoading = false;
          event?.target.complete();
        }
      });
  }

  onSearchChange() {
    this.pageNumber = 0;
    this.loadTeachers();
  }

  loadMore(event: any) {
    if (!this.hasNext) {
      event.target.disabled = true;
      return;
    }
    this.pageNumber += 1;
    this.loadTeachers(event);
  }

  addTeacher() {
    this.navCtrl.navigateForward(['/teacher-detail'], {
      state: { isNew: true }
    });
  }

  editTeacher(teacher: TeacherDto) {
    this.navCtrl.navigateForward(['/teacher-detail'], {
      state: { isNew: false, teacherId: teacher.id }
    });
  }

  deleteTeacher(teacher: TeacherDto) {
    if (!teacher.id) return;
    this.teacherService.deleteTeacher(teacher.id).subscribe({
      next: (res) => {
        if (res.status?.length) {
          this.showStatusErrors(res.status);
        } else {
          this.presentToast('Deleted successfully');
          this.pageNumber = 0;
          this.loadTeachers();
        }
      },
      error: (err) => {
        console.error(err);
        this.presentToast('Delete failed');
      }
    });
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
      position: 'bottom',
    });
    toast.present();
  }
}
