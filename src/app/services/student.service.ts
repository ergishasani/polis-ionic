// src/app/services/student.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { StudentDto, RespSingle, RespSlice } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  upsertStudent(student: StudentDto): Observable<RespSingle<StudentDto>> {
    return this.http.post<RespSingle<StudentDto>>(
      `${this.baseUrl}/upsertStudent`,
      student
    );
  }

  filterStudents(
    filterStr: string,
    pageNumber = 0,
    pageSize = 20
  ): Observable<RespSlice<StudentDto>> {
    const body = {
      filter: filterStr,
      pagination: {
        pageNumber,
        pageSize
      }
    };
    return this.http.post<RespSlice<StudentDto>>(
      `${this.baseUrl}/filterStudents`,
      body
    );
  }

  getStudent(id: number): Observable<RespSingle<StudentDto>> {
    return this.http.post<RespSingle<StudentDto>>(
      `${this.baseUrl}/getStudent`,
      { id }
    );
  }

  deleteStudent(id: number): Observable<RespSingle<null>> {
    return this.http.post<RespSingle<null>>(
      `${this.baseUrl}/deleteStudent`,
      { id }
    );
  }
}
