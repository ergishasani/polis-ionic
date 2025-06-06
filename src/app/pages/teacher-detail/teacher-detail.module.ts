import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherDetailPageRoutingModule } from './teacher-detail-routing.module';

import { TeacherDetailPage } from './teacher-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherDetailPageRoutingModule
  ],
  declarations: [TeacherDetailPage]
})
export class TeacherDetailPageModule {}
