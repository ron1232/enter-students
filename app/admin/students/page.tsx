import StudentsTable from "@/components/tables/StudentsTable";
import { getStudents } from "@/lib/actions/student.actions";
import { getAssignments } from "@/lib/actions/assignments.actions";

export default async function StudentsPage() {
  const students = await getStudents();
  const assignments = await getAssignments();

  return <StudentsTable students={students} assignments={assignments} />;
}
