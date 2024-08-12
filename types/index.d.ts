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

interface ValueLabel {
  value: string;
  label: string;
}

declare interface SearchParams {
  searchParams: { [key: string]: string | string[] | undefined };
}

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      _id: string;
      username: string;
      teacherId: string;
    };
  }
}
