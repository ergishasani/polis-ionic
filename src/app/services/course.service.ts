import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

/**
 * The shape of the JSON we expect when we fetch a paged list of courses.
 * Adjust “data” and “hasNext” to match whatever your backend actually returns.
 */
export interface CourseListResponse {
  data: Course[];
  hasNext: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  /**
   * Change this base URL to match your Spring Boot (or whatever) endpoint.
   * For example, if your Spring Boot endpoint is “/api/courses?page=...&size=...”,
   * then baseUrl might be “http://localhost:8080/api/courses”.
   */
  private baseUrl = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) {}

  /**
   * Fetches a paged list of courses from the server.
   * The server is expected to return { data: Course[], hasNext: boolean }.
   */
  filterCourses(page: number, size: number): Observable<CourseListResponse> {
    return this.http.get<CourseListResponse>(
      `${this.baseUrl}?page=${page}&size=${size}`
    );
  }

  /**
   * Fetches a single Course by its ID.
   * Adjust path if your endpoint is different (e.g. “/api/courses/{id}”).
   */
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }
}
