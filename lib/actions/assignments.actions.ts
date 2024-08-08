"use server";

import dbConnect from "../mongodb";
import Assignment, { IAssignment } from "../mongodb/models/Assignment";
import { parseStringify } from "../utils";

export const editAssignment = async (assignment: IAssignment) => {
  try {
    await dbConnect();

    await Assignment.findByIdAndUpdate(assignment._id, {
      ...assignment,
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const addAssignment = async (assignment: Assignment) => {
  try {
    await dbConnect();

    await Assignment.create({
      ...assignment,
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const deleteAssignment = async (assignmentId: string) => {
  try {
    await dbConnect();

    await Assignment.findByIdAndDelete(assignmentId);

    return true;
  } catch (error) {
    return false;
  }
};

export const getAssignments = async (): Promise<IAssignment[]> => {
  try {
    await dbConnect();

    const allAssignments: IAssignment[] = await Assignment.find({});
    return parseStringify(allAssignments);
  } catch (error: any) {
    return [];
  }
};
