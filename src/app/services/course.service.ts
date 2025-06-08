// src/app/services/course.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CourseDto, RespSingle, RespSlice } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private baseUrl = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) {}

  filterCourses(
    page: number,
    size: number,
    filter: string = ''
  ): Observable<RespSlice<CourseDto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('filter', filter);

    return this.http
      .get<RespSlice<CourseDto>>(this.baseUrl, { params })
      .pipe(
        catchError(err => {
          console.warn('filterCourses failed', err);
          throw err;
        })
      );
  }

  getCourseById(id: number): Observable<RespSingle<CourseDto>> {
    return this.http.get<RespSingle<CourseDto>>(`${this.baseUrl}/${id}`);
  }

  createCourse(course: CourseDto): Observable<RespSingle<CourseDto>> {
    return this.http.post<RespSingle<CourseDto>>(this.baseUrl, course);
  }

  updateCourse(course: CourseDto): Observable<RespSingle<CourseDto>> {
    return this.http.put<RespSingle<CourseDto>>(
      `${this.baseUrl}/${course.id}`,
      course
    );
  }

  deleteCourse(id: number): Observable<RespSingle<void>> {
    return this.http.delete<RespSingle<void>>(`${this.baseUrl}/${id}`);
  }

  associateTeacherToCourse(
    courseId: number,
    teacherId: number
  ): Observable<RespSingle<void>> {
    return this.http.post<RespSingle<void>>(
      `${this.baseUrl}/${courseId}/teachers`,
      { courseId, teacherId }
    );
  }

  removeTeacherFromCourse(
    courseId: number,
    teacherId: number
  ): Observable<RespSingle<void>> {
    return this.http.delete<RespSingle<void>>(
      `${this.baseUrl}/${courseId}/teachers/${teacherId}`
    );
  }
}
