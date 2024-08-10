"use server";

import { checkCookie } from "../checkCookie";
import dbConnect from "../mongodb";
import Student, { IStudent } from "../mongodb/models/Student";
import { itemsPerPage, parseStringify } from "../utils";

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

export const getStudents = async (
  page = 1
): Promise<{ students: IStudent[]; itemsCount: number }> => {
  try {
    await checkCookie();

    await dbConnect();

    const students: IStudent[] = await Student.find({})
      .populate("assignments")
      .find({})
      .skip(itemsPerPage * (page - 1))
      .limit(itemsPerPage);

    const itemsCount = await Student.countDocuments({});
    return parseStringify({ students, itemsCount });
  } catch (error: any) {
    return { students: [], itemsCount: 0 };
  }
};
