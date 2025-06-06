// src/app/services/teacher.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  TeacherDto,
  RespSingle,
  RespSlice,
  ServerStatus
} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  upsertTeacher(teacher: TeacherDto): Observable<RespSingle<TeacherDto>> {
    return this.http.post<RespSingle<TeacherDto>>(
      `${this.baseUrl}/upsertTeacher`,
      teacher
    );
  }

  filterTeachers(
    filterStr: string,
    pageNumber = 0,
    pageSize = 20
  ): Observable<RespSlice<TeacherDto>> {
    const body = {
      filter: filterStr,
      pagination: {
        pageNumber,
        pageSize
      }
    };
    return this.http.post<RespSlice<TeacherDto>>(
      `${this.baseUrl}/filterTeachers`,
      body
    );
  }

  getTeacher(id: number): Observable<RespSingle<TeacherDto>> {
    return this.http.post<RespSingle<TeacherDto>>(
      `${this.baseUrl}/getTeacher`,
      { id }
    );
  }

  deleteTeacher(id: number): Observable<RespSingle<null>> {
    return this.http.post<RespSingle<null>>(
      `${this.baseUrl}/deleteTeacher`,
      { id }
    );
  }
}
