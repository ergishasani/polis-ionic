// src/app/models/models.ts

export interface TeacherDto {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  courses?: CourseDto[];
}

export interface StudentDto {
  id: number;
  firstName: string;
  lastName: string;
  serialNumber: string;
  course?: CourseDto;
}

export interface CourseDto {
  id?: number;
  code: string;
  title: string;
  description: string;
  year: number;
  teacher?: TeacherDto | null;
  students?: StudentDto[];
}

export interface RespSingle<T> {
  data: T;
  errorContext: any[];
}

export interface RespSlice<T> {
  dataSlice: {
    content: T[];
    pageable: any;
    first: boolean;
    last: boolean;
    number: number;
    size: number;
    numberOfElements: number;
    empty: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
  };
  errorContext: any[];
}
