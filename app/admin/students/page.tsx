import StudentsTable from "@/components/tables/StudentsTable";
import { getStudents } from "@/lib/actions/student.actions";
import { getAssignments } from "@/lib/actions/assignments.actions";
import { SearchParams } from "@/types";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { PiStudentFill } from "react-icons/pi";
import { PiChalkboardTeacherFill } from "react-icons/pi";

export default async function StudentsPage({ searchParams }: SearchParams) {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";

  const { students, itemsCountForNextPage } = await getStudents(page, search);

  const { assignments } = await getAssignments();

  return (
    <>
      <StudentsTable students={students} assignments={assignments}>
        <Search type="students" />
        <PiStudentFill
          className="absolute top-52 left-5 rotate-45"
          size={100}
        />
        <PiChalkboardTeacherFill
          className="absolute top-52 right-5 -rotate-45"
          size={80}
        />
      </StudentsTable>
      <Pagination
        itemsLength={itemsCountForNextPage}
        pathname="/admin/students"
      />
    </>
  );
}
