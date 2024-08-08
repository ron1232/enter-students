import React from "react";
import Modal from "../Modal";
import { IStudent } from "@/lib/mongodb/models/Student";
import { IAssignment } from "@/lib/mongodb/models/Assignment";
import EditOrAddStudentForm from "../EditOrAddStudentForm";
import EditOrAddAssignmentForm from "../EditOrAddAssignmentForm";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  type: "Student" | "Assignment";
  group: "edit" | "add";
  currentItem?: Student | Assignment;
  selectItems?: IStudent[] | IAssignment[];
}

const EditOrAddModal = ({
  isModalOpen,
  setIsModalOpen,
  type,
  group,
  currentItem,
  selectItems,
}: Props) => {
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="text-center w-56">
        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800">
            {group === "edit" ? "Edit" : "Add"} {type}
          </h3>
        </div>

        {/* type assignment */}
        {type === "Assignment" ? (
          group === "add" ? (
            <EditOrAddAssignmentForm
              group={group}
              setIsEditOrAddModalOpen={setIsModalOpen}
            />
          ) : (
            <EditOrAddAssignmentForm
              currentAssignment={currentItem as IAssignment | undefined}
              group={group}
              setIsEditOrAddModalOpen={setIsModalOpen}
            />
          )
        ) : /* type Student */
        group === "add" ? (
          <EditOrAddStudentForm
            setIsEditOrAddModalOpen={setIsModalOpen}
            selectItems={selectItems as IAssignment[]}
            group={group}
          />
        ) : (
          <EditOrAddStudentForm
            setIsEditOrAddModalOpen={setIsModalOpen}
            currentStudent={currentItem as IStudent | undefined}
            selectItems={selectItems as IAssignment[]}
            group={group}
          />
        )}
      </div>
    </Modal>
  );
};

export default EditOrAddModal;
