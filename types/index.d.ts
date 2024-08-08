import { DefaultSession } from "next-auth";

declare interface LoginTeacherParams {
  username: string;
  teacherId: string;
}

declare interface Assignment {
  title: string | undefined;
  body: string | undefined;
}

declare interface Student {
  name: string | undefined;
  classGrade: string | undefined;
  phoneNumber: string | undefined;
}
