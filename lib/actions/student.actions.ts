"use server";

import { ObjectId } from "mongoose";
import { checkCookie } from "../checkCookie";
import dbConnect from "../mongodb";
import Student, { IStudent } from "../mongodb/models/Student";
import { parseStringify } from "../utils";

export const editStudent = async (student: IStudent) => {
  try {
    await checkCookie();

    await dbConnect();

    await Student.findByIdAndUpdate(student._id, { ...student });

    return true;
  } catch (error: any) {
    if (error?.keyValue?.name || error?.keyValue?.phoneNumber) {
      return { errorMessage: "Name or Phone number already exists" };
    }
  }
};

export const addStudent = async (student: IStudent) => {
  try {
    await checkCookie();

    await dbConnect();

    await Student.create({
      ...student,
    });

    return true;
  } catch (error: any) {
    if (error?.keyValue?.name || error?.keyValue?.phoneNumber) {
      return { errorMessage: "Name or Phone number already exists" };
    }
  }
};

export const addAssignmentsToStudent = async (
  studentId: string,
  assignmentsId: Array<ObjectId>
) => {
  try {
    await checkCookie();

    await dbConnect();

    const foundStudent = await Student.findById(studentId);
    foundStudent.assignments.push(...assignmentsId);

    return true;
  } catch (error) {
    return false;
  }
};

export const deleteStudent = async (studentId: string) => {
  try {
    await checkCookie();

    await dbConnect();

    await Student.findByIdAndDelete(studentId);

    return true;
  } catch (error) {
    return false;
  }
};

export const getStudents = async (): Promise<IStudent[]> => {
  try {
    await checkCookie();

    await dbConnect();

    const allStudents: IStudent[] = await Student.find({});
    return parseStringify(allStudents);
  } catch (error: any) {
    return [];
  }
};
