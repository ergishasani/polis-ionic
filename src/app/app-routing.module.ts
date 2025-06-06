import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// src/app/app-routing.module.ts

const routes: Routes = [
  {
    path: '',
    redirectTo: 'course-list',
    pathMatch: 'full'
  },
  {
    path: 'course-list',
    loadChildren: () => import('./pages/course-list/course-list.module').then(m => m.CourseListPageModule)
  },
  {
    path: 'course-detail',
    loadChildren: () => import('./pages/course-detail/course-detail.module').then(m => m.CourseDetailPageModule)
  }
  // … later we’ll add teacher- and student-routes
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
