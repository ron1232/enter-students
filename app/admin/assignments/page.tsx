import AssignmentsTable from "@/components/tables/AssignmentsTable";
import { getAssignments } from "@/lib/actions/assignments.actions";

export default async function AssignmentsPage() {
  const assignments = await getAssignments();

  return <AssignmentsTable assignments={assignments} />;
}
