import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeacherDetailPage } from './teacher-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherDetailPageRoutingModule {}
