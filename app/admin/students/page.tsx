import StudentsTable from "@/components/tables/StudentsTable";
import { getStudents } from "@/lib/actions/student.actions";
import { getAssignments } from "@/lib/actions/assignments.actions";
import { SearchParams } from "@/types";
import Pagination from "@/components/Pagination";

export default async function StudentsPage({ searchParams }: SearchParams) {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const students = await getStudents(page);

  const assignments = await getAssignments();

  return (
    <>
      <StudentsTable students={students} assignments={assignments} />
      <Pagination
        itemsLength={students.length}
        page={page}
        pathname="/admin/students"
      />
    </>
  );
}
