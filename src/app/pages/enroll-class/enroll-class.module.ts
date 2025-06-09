import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EnrollClassPage } from './enroll-class.page';

const routes: Routes = [
  { path: '', component: EnrollClassPage }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    EnrollClassPage   // import your standalone component here
  ]
})
export class EnrollClassPageModule {}
