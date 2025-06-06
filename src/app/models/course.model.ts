// src/app/models/course.model.ts

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  title?: string;
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  serialNumber: string;
}

export interface Course {
  id: number;
  code: string;
  title: string;
  description?: string;
  year?: number;
  teacher?: Teacher;
  students?: Student[];
}
