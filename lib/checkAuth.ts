"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import Teacher from "./mongodb/models/Teacher";
import dbConnect from "./mongodb";

export const checkAuth = async () => {
  try {
    await dbConnect();
    const response = await getServerSession(authOptions);
    const foundUser = await Teacher.findById(response?.user._id);

    if (foundUser) {
      if (
        foundUser.username === response?.user.username &&
        foundUser.teacherId === response?.user.teacherId
      ) {
        return true;
      }
    }

    return false;
  } catch (error) {
    return false;
  }
};
