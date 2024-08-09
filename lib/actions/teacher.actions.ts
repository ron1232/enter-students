"use server";

import { LoginTeacherParams } from "@/types";
import dbConnect from "../mongodb";
import Teacher from "../mongodb/models/Teacher";

export const loginTeacher = async (teacher: LoginTeacherParams) => {
  try {
    await dbConnect();

    const foundTeacher = await Teacher.findOne({
      username: teacher.username,
      teacherId: teacher.teacherId,
    });

    if (foundTeacher) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};
