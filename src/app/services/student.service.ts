// src/app/services/course.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:8080'; // your Spring Boot base URL

  constructor(private http: HttpClient) {}

  /**
   * Fetch a slice or list of courses (e.g. for CourseList). Optional.
   * For detail page, we only need getCourseById().
   */
  // getCourses(page: number, size: number): Observable<Course[]> {
  //   return this.http.post<Course[]>(
  //     `${this.baseUrl}/filterCourses`,
  //     { filter: '', pagination: { pageNumber: page, pageSize: size } }
  //   );
  // }

  /**
   * GET a single course by its ID. Adjust path if your backend uses /getCourse.
   */
  getCourseById(id: number): Observable<Course> {
    // We assume your Spring endpoint is POST /getCourse with a JSON body { "id": <number> }
    // If you prefer GET, adjust server side accordingly.
    return this.http.post<Course>(`${this.baseUrl}/getCourse`, {
      id: id
    });
  }

  /**
   * (Optional) Update or create a course. Not used on this detail page example.
   */
  // upsertCourse(course: Course): Observable<Course> {
  //   return this.http.post<Course>(`${this.baseUrl}/upsertCourse`, course);
  // }

  // Add other methods (deleteCourse, associateTeacher, etc.) as needed.
}
