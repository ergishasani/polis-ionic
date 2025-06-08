import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { StudentDto, RespSingle } from '../../models/models';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.page.html',
  styleUrls: ['./student-detail.page.scss'],
})
export class StudentDetailPage implements OnInit {
  student?: StudentDto;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam !== null ? Number(idParam) : NaN;
    if (!Number.isNaN(id)) {
      this.studentService.getStudent(id).subscribe({
        next: (res: RespSingle<StudentDto>) => {
          this.student = res.data ?? undefined;
        },
        error: (err) => {
          console.error('Failed to load student', err);
        }
      });
    }
  }

}
