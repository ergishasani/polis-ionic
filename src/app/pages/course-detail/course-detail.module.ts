import { NgModule }                      from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { FormsModule }                   from '@angular/forms';
import { IonicModule }                   from '@ionic/angular';

import { CourseDetailPage }              from './course-detail.page';
import { CourseDetailPageRoutingModule } from './course-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CourseDetailPageRoutingModule,
    CourseDetailPage // Standalone component import
  ]
  // Remove declarations array
})
export class CourseDetailPageModule {}
