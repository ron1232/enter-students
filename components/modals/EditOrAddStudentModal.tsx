import React from "react";
import Modal from "../Modal";
import EditStudentForm from "../EditStudentForm";
import AddStudentForm from "../AddStudentForm";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  type: "edit" | "add";
}

const EditOrAddStudentModal = ({
  isModalOpen,
  setIsModalOpen,
  type,
}: Props) => {
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="text-center w-56">
        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800">
            {type === "edit" ? "Edit" : "Add"} Student
          </h3>
        </div>
        {type === "add" ? (
          <AddStudentForm setIsAddModalOpen={setIsModalOpen} />
        ) : (
          <EditStudentForm setIsEditModalOpen={setIsModalOpen} />
        )}
      </div>
    </Modal>
  );
};

export default EditOrAddStudentModal;
