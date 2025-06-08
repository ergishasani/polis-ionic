import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CourseListPage } from './course-list.page';
import { CourseListPageRoutingModule } from './course-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseListPageRoutingModule,
    CourseListPage // Standalone component import
  ]
})
export class CourseListPageModule {}
