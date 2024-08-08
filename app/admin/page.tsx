import { RiAdminFill } from "react-icons/ri";
import AssignmentsTable from "@/components/tables/AssignmentsTable";
import StudentsTable from "@/components/tables/StudentsTable";
import { getStudents } from "@/lib/actions/student.actions";
import { getAssignments } from "@/lib/actions/assignments.actions";

export default async function AdminPage() {
  const students = await getStudents();
  const assignments = await getAssignments();

  return (
    <>
      <div className="h-full w-full overflow-auto flex flex-col justify-center items-center pt-16 overflow-x-hidden">
        <h2 className="mb-10 text-3xl font-semibold flex items-center gap-2">
          <RiAdminFill color="green" /> Admin Panel:
        </h2>
        <StudentsTable students={students} assignments={assignments} />
        <AssignmentsTable assignments={assignments} />
      </div>
    </>
  );
}
