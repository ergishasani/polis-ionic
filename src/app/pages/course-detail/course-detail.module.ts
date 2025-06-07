// src/app/pages/course-detail/course-detail.module.ts
import { NgModule } from '@angular/core';
import { CourseDetailPage } from './course-detail.page';
import { CourseDetailPageRoutingModule } from './course-detail-routing.module';

@NgModule({
  imports: [
    // Standalone page brings in its own CommonModule, IonicModule, RouterModule
    CourseDetailPage,
    CourseDetailPageRoutingModule
  ]
})
export class CourseDetailPageModule {}
