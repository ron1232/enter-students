declare interface LoginTeacherParams {
  username: string;
  id: string;
}

declare interface Student {
  name: string | undefined;
  classGrade: string | undefined;
  phoneNumber: string | undefined;
}

declare interface Assignment {
  name: string | undefined;
  body: string | undefined;
}
