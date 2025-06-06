// src/app/services/course.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  CourseDto,
  RespSingle,
  RespSlice,
  ServerStatus
} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  /** Create or update a course */
  upsertCourse(course: CourseDto): Observable<RespSingle<CourseDto>> {
    return this.http.post<RespSingle<CourseDto>>(
      `${this.baseUrl}/upsertCourse`,
      course
    );
  }

  /** Filter (search) courses with pagination */
  filterCourses(
    filterStr: string,
    pageNumber = 0,
    pageSize = 20
  ): Observable<RespSlice<CourseDto>> {
    const body = {
      filter: filterStr,
      pagination: {
        pageNumber,
        pageSize
      }
    };
    return this.http.post<RespSlice<CourseDto>>(
      `${this.baseUrl}/filterCourses`,
      body
    );
  }

  /** Get one course by ID */
  getCourse(id: number): Observable<RespSingle<CourseDto>> {
    return this.http.post<RespSingle<CourseDto>>(
      `${this.baseUrl}/getCourse`,
      { id }
    );
  }

  /** Delete a course */
  deleteCourse(id: number): Observable<RespSingle<null>> {
    return this.http.post<RespSingle<null>>(
      `${this.baseUrl}/deleteCourse`,
      { id }
    );
  }

  /** Associate a teacher to this course */
  associateTeacher(courseId: number, teacherId: number): Observable<RespSingle<null>> {
    return this.http.post<RespSingle<null>>(
      `${this.baseUrl}/associateTeacherToCourse`,
      { idTeacher: teacherId, idCourse: courseId }
    );
  }

  /** Remove teacher from a course */
  removeTeacher(courseId: number, teacherId: number): Observable<RespSingle<null>> {
    return this.http.post<RespSingle<null>>(
      `${this.baseUrl}/removeTeacherFromCourse`,
      { idTeacher: teacherId, idCourse: courseId }
    );
  }
}
