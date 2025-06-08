import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { StudentDto, RespSlice } from '../../models/models';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
})
export class StudentListPage implements OnInit {
  students: StudentDto[] = [];
  pageNumber = 0;
  pageSize = 20;
  isLoading = false;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.studentService
      .filterStudents('', this.pageNumber, this.pageSize)
      .subscribe({
        next: (res: RespSlice<StudentDto>) => {
          this.students = res.slice.content;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading students', err);
          this.isLoading = false;
        }
      });
  }
}
