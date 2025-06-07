// src/app/services/course.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Single‐course shape
export interface Course {
  id: number;
  code: string;
  title: string;
  description: string;
  year: number;
  teacher: any | null;
  students: any[] | null;
}

// List response shape your UI expects
export interface CourseListResponse {
  status: any[];    // optional metadata
  data: Course[];   // array of Course
  hasNext: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:8080';

  // Stub data for offline / fallback
  private readonly _stubCourses: Course[] = [
    { id: 1, code: 'PHIL-101', title: 'Intro to Philosophy', description: 'Basics of philosophical thought.', year: 2025, teacher: null, students: [] },
    { id: 2, code: 'PHIL-202', title: 'Ethics',            description: 'Moral theory & applications.',   year: 2025, teacher: null, students: [] },
    { id: 3, code: 'PHIL-303', title: 'Logic',             description: 'Formal and informal logic.',    year: 2025, teacher: null, students: [] }
  ];

  constructor(private http: HttpClient) {}

  /**
   * FOR TESTING: Immediately return stub data so you can verify
   * your CourseListPage renders these three courses.
   */
  filterCourses(page: number, size: number): Observable<CourseListResponse> {
    return of({
      status:  [],
      data:    this._stubCourses,
      hasNext: false
    });
  }

  /**
   * Fetch a single course by ID. Falls back to stub match if HTTP fails.
   */
  getCourseById(id: number): Observable<{ status: any[]; data: Course }> {
    // Still attempt real HTTP, but fall back to stub if it fails
    return this.http
      .get<{ status: any[]; data: Course }>(`${this.baseUrl}/getCourse/${id}`)
      .pipe(
        catchError(err => {
          console.warn(`getCourse/${id} failed, using stub`, err);
          const found = this._stubCourses.find(c => c.id === id)!;
          return of({ status: [], data: found });
        })
      );
  }
}
