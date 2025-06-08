// src/app/services/student.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StudentDto, RespSingle, RespSlice } from '../models/models';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private baseUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) {}

  filterStudents(
    page: number,
    size: number,
    filter: string = ''
  ): Observable<RespSlice<StudentDto>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('filter', filter);

    return this.http
      .get<RespSlice<StudentDto>>(this.baseUrl, { params })
      .pipe(catchError(err => { throw err; }));
  }

  getStudentById(id: number): Observable<RespSingle<StudentDto>> {
    return this.http.get<RespSingle<StudentDto>>(`${this.baseUrl}/${id}`);
  }

  createStudent(student: StudentDto): Observable<RespSingle<StudentDto>> {
    return this.http.post<RespSingle<StudentDto>>(this.baseUrl, student);
  }

  updateStudent(student: StudentDto): Observable<RespSingle<StudentDto>> {
    return this.http.put<RespSingle<StudentDto>>(
      `${this.baseUrl}/${student.id}`,
      student
    );
  }

  deleteStudent(id: number): Observable<RespSingle<void>> {
    return this.http.delete<RespSingle<void>>(`${this.baseUrl}/${id}`);
  }
}
