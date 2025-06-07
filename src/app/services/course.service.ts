// src/app/services/course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define a TypeScript interface for a single Course:
export interface Course {
  id: number;
  code: string;
  title: string;
  description: string;
  year: number;
  teacher: any | null;
  students: any[] | null;
}

// Define the “list” response shape:
export interface CourseListResponse {
  status: any[];          // (you may not care about this right now)
  data: Course[];         // <- THIS must be an array
  hasNext: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  // NOTE: point to the “getAllCourses” (list) endpoint, not “upsertCourse”
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // When you call filterCourses(0, 20), you expect resp.data to be Course[]
  filterCourses(page: number, size: number): Observable<CourseListResponse> {
    return this.http.get<CourseListResponse>(
      `${this.baseUrl}/getAllCourses?page=${page}&size=${size}`
    );
  }

  // If you still want to fetch one single course by ID:
  getCourseById(id: number): Observable<{ status: any[]; data: Course }> {
    return this.http.get<{ status: any[]; data: Course }>(
      `${this.baseUrl}/getCourse/${id}`
    );
  }
}
