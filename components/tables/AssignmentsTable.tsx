"use client";

import DeleteModal from "@/components/modals/DeleteModal";
import EditOrAddModal from "@/components/modals/EditOrAddModal";
import { useMemo, useState } from "react";
import { CiTrash, CiEdit } from "react-icons/ci";
import Th from "@/components/Th";
import AddButton from "../AddButton";
import { IAssignment } from "@/lib/mongodb/models/Assignment";

interface Props {
  assignments: IAssignment[];
}

export default function AssignmentsTable({ assignments }: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentAssignments, setCurrentAssignments] = useState(assignments);
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
    const currentAssignment = currentAssignments.find(
      (assignment) => assignment._id === currentAssignmentId
    );
    setCurrentAssignment(currentAssignment);
  }, [currentAssignmentId]);

  const handleDelete = () => {
    const updatedAssignments = currentAssignments.filter(
      (assignment) => assignment._id !== currentAssignmentId
    );
    setCurrentAssignments(updatedAssignments);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <h3 className="self-start w-2/3 mx-auto mb-3 mt-10 underline">
        Assignments Table:
      </h3>
      <table className="w-2/3 min-w-max table-auto text-left shadow-xl mb-10 ">
        <thead>
          <tr>
            {assignmentsTableHead.map((head) => (
              <Th key={head} head={head} />
            ))}
          </tr>
        </thead>
        <tbody>
          {currentAssignments.map(({ title, body, _id }, index) => {
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
          currentItem={currentAssignment}
        />
      )}
      {isAddModalOpen && (
        <EditOrAddModal
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
          type="Assignment"
          group="add"
          currentItem={currentAssignment}
        />
      )}
    </>
  );
}
