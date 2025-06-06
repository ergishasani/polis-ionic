// src/app/pages/student-detail/student-detail.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StudentDetailPageRoutingModule } from './student-detail-routing.module';
import { StudentDetailPage } from './student-detail.page';

@NgModule({
  imports: [
    CommonModule,                 // provides *ngIf / *ngFor
    FormsModule,                  // provides [(ngModel)]
    IonicModule,                  // provides all <ion-*> components/directives
    StudentDetailPageRoutingModule,
    StudentDetailPage             // import the standalone page itself
  ]
})
export class StudentDetailPageModule {}
