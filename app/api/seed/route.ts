import dbConnect from "@/lib/mongodb";
import Assignment from "@/lib/mongodb/models/Assignment";
import Student from "@/lib/mongodb/models/Student";
import Teacher from "@/lib/mongodb/models/Teacher";
import { NextResponse } from "next/server";

const seedDb = async () => {
  try {
    await dbConnect();

    const seedStudents = [
      {
        name: "John Michael",
        classGrade: "Grade 1",
        phoneNumber: "0546501629",
      },
      {
        name: "Alexa Liras",
        classGrade: "Grade 1",
        phoneNumber: "0541111689",
      },
      {
        name: "Laurent Perrier",
        classGrade: "Grade 2",
        phoneNumber: "0522211629",
      },
      {
        name: "Michael Levi",
        classGrade: "Grade 7",
        phoneNumber: "0526984752",
      },
      {
        name: "Richard Gran",
        classGrade: "Grade 1",
        phoneNumber: "0526941570",
      },
    ];

    await Student.deleteMany({}); //database keyword to delete many items/data if any exists.
    await Student.insertMany(seedStudents); //this insert's the defined data above

    const seedAssignments = [
      {
        title: "Write an essay",
        body: "Write an essay about the role of english in your future career",
      },
      {
        title: "Write a research",
        body: "Write a research about the value added tax law",
      },
      {
        title: "Compose a song",
        body: "Compose a song using ai",
      },
      {
        title: "Write a review",
        body: "Write a review about a film you watched",
      },
      {
        title: "Program a class",
        body: "Program a class employee in python",
      },
    ];

    await Assignment.deleteMany({});
    await Assignment.insertMany(seedAssignments);

    const seedTeachers = [
      {
        username: "ronbarak",
        teacherId: "554875621",
      },
      {
        username: "johndoe",
        teacherId: "322345678",
      },
      {
        username: "israelisraeli",
        teacherId: "996258745",
      },
      {
        username: "yakov22",
        teacherId: "223221548",
      },
    ];

    await Teacher.deleteMany({});
    await Teacher.insertMany(seedTeachers);

    return NextResponse.json({
      message: "Inserted Students, Teachers & Assignments",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export async function GET() {
  return seedDb();
}
