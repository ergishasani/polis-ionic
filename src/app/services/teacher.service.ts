// src/app/services/teacher.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TeacherDto, RespSingle, RespSlice } from '../models/models';

@Injectable({ providedIn: 'root' })
export class TeacherService {
  private baseUrl = 'http://localhost:8080/api/teachers';

  constructor(private http: HttpClient) {}

  filterTeachers(
    page: number,
    size: number,
    filter: string = ''
  ): Observable<RespSlice<TeacherDto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('filter', filter);

    return this.http
      .get<RespSlice<TeacherDto>>(this.baseUrl, { params })
      .pipe(catchError(err => { throw err; }));
  }

  getTeacherById(id: number): Observable<RespSingle<TeacherDto>> {
    return this.http.get<RespSingle<TeacherDto>>(`${this.baseUrl}/${id}`);
  }

  createTeacher(teacher: TeacherDto): Observable<RespSingle<TeacherDto>> {
    return this.http.post<RespSingle<TeacherDto>>(this.baseUrl, teacher);
  }

  updateTeacher(teacher: TeacherDto): Observable<RespSingle<TeacherDto>> {
    return this.http.put<RespSingle<TeacherDto>>(
      `${this.baseUrl}/${teacher.id}`,
      teacher
    );
  }

  deleteTeacher(id: number): Observable<RespSingle<void>> {
    return this.http.delete<RespSingle<void>>(`${this.baseUrl}/${id}`);
  }
}
