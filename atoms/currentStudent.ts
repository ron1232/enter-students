import { atom } from "jotai";

export const currentStudentAtom = atom<Student | undefined>({
  name: "",
  classGrade: "",
  phoneNumber: "",
});
