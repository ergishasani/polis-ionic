// src/app/pages/course-detail/course-detail.module.ts

import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CourseDetailPage } from './course-detail.page';
import { CourseDetailPageRoutingModule } from './course-detail-routing.module';

@NgModule({
  imports: [
    CourseDetailPage,             // Standalone component
    IonicModule,                  // Enables <ion-*> components
    CourseDetailPageRoutingModule // Child‐route for "/course-detail/:id"
  ]
})
export class CourseDetailPageModule {}
