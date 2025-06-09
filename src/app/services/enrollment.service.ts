import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
}

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  private base = '/api/enrollments';

  constructor(private http: HttpClient) {}

  // Enroll the current student
  enroll(studentId: number, courseId: number): Observable<Enrollment> {
    return this.http.post<Enrollment>(
      `${this.base}/students/${studentId}/courses/${courseId}`, {}
    );
  }

  // Fetch all enrollments for a student
  listByStudent(studentId: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(
      `${this.base}/students/${studentId}`
    );
  }
}
