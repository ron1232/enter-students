"use client";

import DeleteModal from "@/components/modals/DeleteModal";
import EditOrAddModal from "@/components/modals/EditOrAddModal";
import { useMemo, useState } from "react";
import { CiTrash, CiEdit } from "react-icons/ci";
import Th from "@/components/Th";
import AddButton from "../AddButton";
import { IAssignment } from "@/lib/mongodb/models/Assignment";
import { deleteAssignment } from "@/lib/actions/assignments.actions";
import { Assignment } from "@/types";
import { toast } from "react-toastify";
import TableHeader from "../TableHeader";

interface Props {
  assignments: IAssignment[];
  children: React.ReactNode;
}

export default function AssignmentsTable({ assignments, children }: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentAssignmentId, setCurrentAssignmentId] = useState("0");

  const assignmentsTableHead = useMemo(() => ["Title", "Body", "Action"], []);

  const [currentAssignment, setCurrentAssignment] = useState<
    Assignment | undefined
  >({
    title: "",
    body: "",
  });

  //set atom
  useMemo(() => {
    const currentAssignment = assignments.find(
      (assignment) => assignment._id === currentAssignmentId
    );
    setCurrentAssignment(currentAssignment);
  }, [currentAssignmentId]);

  const handleDelete = async () => {
    const deleteAssignmentSuccessOrFail = await deleteAssignment(
      currentAssignmentId
    );
    if (deleteAssignmentSuccessOrFail === true) {
      return window.location.reload();
    }

    toast.error(deleteAssignmentSuccessOrFail?.errorMessage);
    return setIsDeleteModalOpen(false);
  };

  return (
    <>
      <TableHeader title="Assignments Table:" />
      {children}
      <table className="w-2/3 min-w-max table-auto text-left shadow-xl mb-10 ">
        <thead>
          <tr>
            {assignmentsTableHead.map((head) => (
              <Th key={head} head={head} />
            ))}
          </tr>
        </thead>
        <tbody>
          {assignments.map(({ title, body, _id }, index) => {
            const isLast = index === assignments.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-gray-500";

            return (
              <tr key={_id as string}>
                <td className={classes}>
                  <p className="font-normal">{title}</p>
                </td>

                <td className={`${classes} w-60`}>
                  <p className="font-normal">{body}</p>
                </td>
                <td className={classes}>
                  <div className="flex gap-5">
                    <button
                      className="flex items-center"
                      onClick={() => {
                        setIsEditModalOpen(true);
                        setCurrentAssignmentId(_id as string);
                      }}
                    >
                      <CiEdit color="gray" />
                      Edit
                    </button>{" "}
                    <button
                      className="flex items-center"
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setCurrentAssignmentId(_id as string);
                      }}
                    >
                      <CiTrash color="red" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <AddButton
          text="Add An Assignment"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleDelete={handleDelete}
        type="Assignment"
      />
      {isEditModalOpen && (
        <EditOrAddModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          type="Assignment"
          group="edit"
          currentItem={currentAssignment as IAssignment}
        />
      )}
      {isAddModalOpen && (
        <EditOrAddModal
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
          type="Assignment"
          group="add"
          currentItem={currentAssignment as IAssignment}
        />
      )}
    </>
  );
}
