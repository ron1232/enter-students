"use server";

import dbConnect from "../mongodb";
import Assignment, { IAssignment } from "../mongodb/models/Assignment";
import { parseStringify } from "../utils";

export const editAssignment = async (assignment: Assignment) => {
  await dbConnect();
};

export const addAssignment = async (assignment: Assignment) => {
  try {
    await dbConnect();

    const addedAssignment = await Assignment.create({
      ...assignment,
    });

    return parseStringify(addedAssignment);
  } catch (error) {
    return false;
  }
};

export const deleteAssignment = async (assignmentId: string) => {
  try {
    await dbConnect();

    await Assignment.findByIdAndDelete(assignmentId);
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
