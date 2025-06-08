// src/app/models/api-wrappers.ts

export interface RespSingle<T> {
  data: T | null;
  errorContext: any[];
}

export interface RespSlice<T> {
  dataSlice: {
    content: T[];
    pageable: any;
    first: boolean;
    last: boolean;
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
    sort: any;
    // ...and any other fields Spring returns
  };
  errorContext: any[];
}
