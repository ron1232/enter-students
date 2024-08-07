"use server";

import dbConnect from "../mongodb";
import Student, { IStudent } from "../mongodb/models/Student";
import { parseStringify } from "../utils";

export const editStudent = async (student: IStudent) => {
  try {
    await dbConnect();

    const editedStudent = await Student.findByIdAndUpdate(student._id, {
      ...student,
    });

    return editedStudent;
  } catch (error) {
    return false;
  }
};

export const addStudent = async (student: Student) => {
  try {
    await dbConnect();

    const addedStudent = await Student.create({
      ...student,
    });

    return parseStringify(addedStudent);
  } catch (error) {
    return false;
  }
};

export const deleteStudent = async (studentId: string) => {
  try {
    await dbConnect();

    await Student.findByIdAndDelete(studentId);
  } catch (error) {
    return false;
  }
};

export const getStudents = async (): Promise<IStudent[]> => {
  try {
    await dbConnect();

    const allStudents: IStudent[] = await Student.find({});
    return parseStringify(allStudents);
  } catch (error: any) {
    return [];
  }
};
