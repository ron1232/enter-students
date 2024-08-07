"use client";

import DeleteModal from "@/components/modals/DeleteModal";
import EditOrAddModal from "@/components/modals/EditOrAddModal";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { CiTrash, CiEdit } from "react-icons/ci";
import Th from "@/components/Th";
import { currentAssignmentAtom } from "@/atoms/currentAssignment";
import AddButton from "../AddButton";

export default function AssignmentsTable() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentAssignmentId, setCurrentAssignmentId] = useState("0");

  const [assignments, setAssignments] = useState([
    {
      id: "1",
      name: "Write an essay",
      body: "Write an essay about the role of english in your future career",
    },
    {
      id: "2",
      name: "Write a research",
      body: "Write a research about the value added tax law",
    },
    {
      id: "3",
      name: "Compose a song",
      body: "Compose a song using ai",
    },
    {
      id: "4",
      name: "Write a review",
      body: "Write a review about a film you watched",
    },
    {
      id: "5",
      name: "Program a class",
      body: "Program a class employee in python",
    },
  ]);

  const assignmentsTableHead = useMemo(() => ["Name", "Body", "Action"], []);

  const [_, setCurrentAssignment] = useAtom(currentAssignmentAtom);

  //set atom
  useMemo(() => {
    const currentAssignment = assignments.find(
      (assignment) => assignment.id === currentAssignmentId
    );
    setCurrentAssignment(currentAssignment);
  }, [currentAssignmentId]);

  const handleDelete = () => {
    const updatedAssignments = assignments.filter(
      (assignment) => assignment.id !== currentAssignmentId
    );
    setAssignments(updatedAssignments);
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
          {assignments.map(({ name, body, id }, index) => {
            const isLast = index === assignments.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-gray-500";

            return (
              <tr key={name}>
                <td className={classes}>
                  <p className="font-normal">{name}</p>
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
                        setCurrentAssignmentId(id);
                      }}
                    >
                      <CiEdit color="gray" />
                      Edit
                    </button>{" "}
                    <button
                      className="flex items-center"
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setCurrentAssignmentId(id);
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
        />
      )}
      {isAddModalOpen && (
        <EditOrAddModal
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
          type="Assignment"
          group="add"
        />
      )}
    </>
  );
}
