"use server";

import { ObjectId } from "mongodb";
import { checkCookie } from "../checkCookie";
import dbConnect from "../mongodb";
import Assignment, { IAssignment } from "../mongodb/models/Assignment";
import Student from "../mongodb/models/Student";
import { parseStringify } from "../utils";

export const editAssignment = async (assignment: IAssignment) => {
  try {
    await checkCookie();

    await dbConnect();

    await Assignment.findByIdAndUpdate(assignment._id, {
      ...assignment,
    });

    return true;
  } catch (error: any) {
    if (error?.keyValue?.title) {
      return { errorMessage: "Title already exists" };
    }
  }
};

export const addAssignment = async (assignment: IAssignment) => {
  try {
    await checkCookie();

    await dbConnect();

    await Assignment.create({
      ...assignment,
    });

    return true;
  } catch (error: any) {
    if (error?.keyValue?.title) {
      return { errorMessage: "Title already exists" };
    }
  }
};

export const deleteAssignment = async (assignmentId: string) => {
  try {
    await checkCookie();

    await dbConnect();

    const foundStudents = await Student.find({
      assignments: new ObjectId(assignmentId),
    });

    if (foundStudents.length > 0) {
      return {
        errorMessage: "Can't delete assignment when connected to a student",
      };
    }

    await Assignment.findByIdAndDelete(assignmentId);

    return true;
  } catch (error) {
    return {
      errorMessage: "Something unexpected happened",
    };
  }
};

export const getAssignments = async (): Promise<IAssignment[]> => {
  try {
    await checkCookie();

    await dbConnect();

    const allAssignments: IAssignment[] = await Assignment.find({});
    return parseStringify(allAssignments);
  } catch (error: any) {
    return [];
  }
};
