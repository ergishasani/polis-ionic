// src/app/pages/course-detail/course-detail.module.ts

import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CourseDetailPage } from './course-detail.page';
import { CourseDetailPageRoutingModule } from './course-detail-routing.module';

@NgModule({
  imports: [
    // Because CourseDetailPage is standalone, we import it directly:
    CourseDetailPage,
    IonicModule,                // so <ion-header>, <ion-content>, etc. work
    CourseDetailPageRoutingModule, // so the router can wire up “path: '' → CourseDetailPage”
  ],
  // NO declarations: [CourseDetailPage] – remove that entirely
})
export class CourseDetailPageModule {}
