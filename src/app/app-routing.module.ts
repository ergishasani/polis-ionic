// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page'; // ✅ Standalone
import { ProfilePage } from './pages/profile/profile.page'; // ✅ Add this too

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
    path: 'login',
    component: LoginPage
  },
  {
    path: 'profile',
    component: ProfilePage
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
