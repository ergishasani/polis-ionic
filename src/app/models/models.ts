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
  id?: number;            // optional on create
  code: string;
  title: string;
  description: string;
  year: number;
  teacher?: TeacherDto | null;
  students?: StudentDto[];
}

// Server‐side “ServerStatus” object:
export interface ServerStatus {
  code: string;      // e.g. "COURSE_NOT_FOUND"
  severity: string;
  message: string;
  action: string;
  helpReference: string;
  traceId: string;
}

// Wrapper for single‐object responses:
export interface RespSingle<T> {
  status: ServerStatus[];
  data: T | null;
}

// Wrapper for paged “Slice” responses:
export interface RespSlice<T> {
  status: ServerStatus[];
  slice: {
    content: T[];
    pageable: any;
    last: boolean;
    first: boolean;
    number: number;
    size: number;
    numberOfElements: number;
    empty: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}
