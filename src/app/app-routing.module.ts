// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'course-list',
    pathMatch: 'full'
  },
  {
    path: 'course-list',
    loadChildren: () =>
      import('./pages/course-list/course-list.module').then(
        m => m.CourseListPageModule
      )
  },
  {
    path: 'course-detail/:id',
    loadChildren: () =>
      import('./pages/course-detail/course-detail.module').then(
        m => m.CourseDetailPageModule
      )
  },
  {
    path: '**',
    redirectTo: 'course-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
