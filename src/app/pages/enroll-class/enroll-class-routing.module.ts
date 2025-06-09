import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnrollClassPage } from './enroll-class.page';

const routes: Routes = [
  {
    path: '',
    component: EnrollClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnrollClassPageRoutingModule {}
