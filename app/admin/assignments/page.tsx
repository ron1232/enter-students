import Pagination from "@/components/Pagination";
import AssignmentsTable from "@/components/tables/AssignmentsTable";
import { getAssignments } from "@/lib/actions/assignments.actions";
import { SearchParams } from "@/types";

export default async function AssignmentsPage({ searchParams }: SearchParams) {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const assignments = await getAssignments(page);

  return (
    <>
      <AssignmentsTable assignments={assignments} />
      <Pagination
        itemsLength={assignments.length}
        page={page}
        pathname="/admin/assignments"
      />
    </>
  );
}
