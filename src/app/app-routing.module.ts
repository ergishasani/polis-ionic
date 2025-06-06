// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'course-list',
    pathMatch: 'full',
  },
  // … your other pages (course‐list, teacher‐list, etc.)
  {
    path: 'course-detail/:id',
    loadChildren: () =>
      import('./pages/course-detail/course-detail.module').then(
        (m) => m.CourseDetailPageModule
      ),
  },
  {
    path: 'course-detail',
    loadChildren: () =>
      import('./pages/course-detail/course-detail.module').then(m => m.CourseDetailPageModule)
  },
  {
    path: 'teacher-list',
    loadChildren: () =>
      import('./pages/teacher-list/teacher-list.module').then(m => m.TeacherListPageModule)
  },
  {
    path: 'student-list',
    loadChildren: () =>
      import('./pages/student-list/student-list.module').then(m => m.StudentListPageModule)
  },
  {
    path: 'student-detail',
    loadChildren: () =>
      import('./pages/student-detail/student-detail.module').then(m => m.StudentDetailPageModule)
  },
  {
    path: '**',
    redirectTo: 'course-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
