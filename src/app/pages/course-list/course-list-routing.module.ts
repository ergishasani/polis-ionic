// src/app/pages/course-list/course-list-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListPage } from './course-list.page';

const routes: Routes = [
  {
    path: '',
    component: CourseListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseListPageRoutingModule {}
