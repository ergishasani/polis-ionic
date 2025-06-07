// src/app/pages/course-list/course-list.module.ts
import { NgModule } from '@angular/core';
import { CourseListPage } from './course-list.page';
import { CourseListPageRoutingModule } from './course-list-routing.module';

@NgModule({
  imports: [
    CourseListPage,
    CourseListPageRoutingModule
  ]
})
export class CourseListPageModule {}
