// src/app/services/course.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

export interface CourseListResponse {
  data: Course[];
  hasNext: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  // TODO: Replace with your actual backend URL
  private baseUrl = 'https://api.example.com/courses';

  constructor(private http: HttpClient) {}

  /**
   * Fetch a paged list of courses.
   */
  filterCourses(page: number, size: number): Observable<CourseListResponse> {
    return this.http.get<CourseListResponse>(
      `${this.baseUrl}?page=${page}&size=${size}`
    );
  }

  /**
   * Fetch a single course by its ID.
   */
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }
}
