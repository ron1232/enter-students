import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import AssignmentsTable from "@/components/tables/AssignmentsTable";
import { getAssignments } from "@/lib/actions/assignments.actions";
import { SearchParams } from "@/types";

export default async function AssignmentsPage({ searchParams }: SearchParams) {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";

  const assignments = await getAssignments(page, search);

  return (
    <>
      <AssignmentsTable assignments={assignments}>
        <Search type="assignments" search={search} />
      </AssignmentsTable>
      <Pagination
        itemsLength={assignments.length}
        page={page}
        pathname="/admin/assignments"
      />
    </>
  );
}
