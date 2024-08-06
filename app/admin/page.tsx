"use client";

import { currentStudentAtom } from "@/atoms/currentStudent";
import DeleteStudentModal from "@/components/modals/DeleteStudentModal";
import EditOrAddStudentModal from "@/components/modals/EditOrAddStudentModal";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { CiTrash, CiEdit } from "react-icons/ci";
import { MdAddBox } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import Th from "@/components/Th";
import AssignmentsTable from "@/components/tables/AssignmentsTable";
import StudentsTable from "@/components/tables/StudentsTable";

export default function AdminPage() {
  return (
    <>
      <div className="h-full w-full overflow-auto flex flex-col justify-center items-center pt-16">
        <h2 className="mb-10 text-3xl font-semibold flex items-center gap-2">
          <RiAdminFill color="green" /> Admin Panel:
        </h2>
        <StudentsTable />
        <AssignmentsTable />
      </div>
    </>
  );
}
