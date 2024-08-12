"use server";

import { ObjectId } from "mongodb";
import dbConnect from "../mongodb";
import Assignment, { IAssignment } from "../mongodb/models/Assignment";
import Student from "../mongodb/models/Student";
import { itemsPerPage, parseStringify } from "../utils";
import { checkAuth } from "../checkAuth";

export const editAssignment = async (assignment: IAssignment) => {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) return false;

    await dbConnect();

    const updatedAssignment = await Assignment.findByIdAndUpdate(
      assignment._id,
      {
        ...assignment,
      }
    );

    await updatedAssignment.save();

    return true;
  } catch (error: any) {
    if (error?.keyValue?.title) {
      return { errorMessage: "Title already exists" };
    }
  }
};

export const addAssignment = async (assignment: IAssignment) => {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) return false;

    await dbConnect();

    const createdAssignment = await Assignment.create({
      ...assignment,
    });

    await createdAssignment.save();

    return true;
  } catch (error: any) {
    if (error?.keyValue?.title) {
      return { errorMessage: "Title already exists" };
    }
  }
};

export const deleteAssignment = async (assignmentId: string) => {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) return false;

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

export const getAssignments = async (
  page: number | null = null,
  search = ""
): Promise<{
  assignments: IAssignment[];
  itemsCountForNextPage: number;
}> => {
  try {
    const isAuth = await checkAuth();
    if (!isAuth) return { assignments: [], itemsCountForNextPage: 0 };

    let assignments: IAssignment[] | [];

    await dbConnect();

    // if Pagination
    if (page) {
      assignments = await Assignment.find({
        $or: [
          {
            title: {
              $regex: new RegExp(search.toLowerCase(), "i"),
            },
          },
        ],
      })
        .skip(itemsPerPage * (page - 1))
        .limit(itemsPerPage)
        .sort({ updatedAt: "desc" });

      const assignmentsCountForNextPage =
        await Assignment.countDocuments().skip(itemsPerPage * page);

      return parseStringify({
        assignments,
        itemsCountForNextPage: assignmentsCountForNextPage,
      });
    }

    assignments = await Assignment.find({
      $or: [
        {
          title: {
            $regex: new RegExp(search.toLowerCase(), "i"),
          },
        },
      ],
    }).sort({ updatedAt: "desc" });

    return parseStringify({ assignments, itemsCountForNextPage: 0 });
  } catch (error: any) {
    return { assignments: [], itemsCountForNextPage: 0 };
  }
};
