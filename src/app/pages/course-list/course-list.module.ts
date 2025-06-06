// src/app/pages/course-list/course-list.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CourseListPageRoutingModule } from './course-list-routing.module';
import { CourseListPage } from './course-list.page'; // Standalone component

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseListPageRoutingModule,
    CourseListPage  // Import the standalone CourseListPage
  ]
})
export class CourseListPageModule {}
