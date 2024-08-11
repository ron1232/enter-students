import StudentsTable from "@/components/tables/StudentsTable";
import { getStudents } from "@/lib/actions/student.actions";
import { getAssignments } from "@/lib/actions/assignments.actions";
import { SearchParams } from "@/types";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";

export default async function StudentsPage({ searchParams }: SearchParams) {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";

  const students = await getStudents(page, search);

  const assignments = await getAssignments();

  return (
    <>
      <StudentsTable students={students} assignments={assignments}>
        <Search type="students" />
      </StudentsTable>
      <Pagination itemsLength={students.length} pathname="/admin/students" />
    </>
  );
}
