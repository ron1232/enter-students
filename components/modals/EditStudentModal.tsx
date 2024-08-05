import React from "react";
import Modal from "../Modal";
import EditStudentForm from "../EditStudentForm";

interface Props {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
}

const EditStudentModal = ({ isEditModalOpen, setIsEditModalOpen }: Props) => {
  return (
    <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
      <div className="text-center w-56">
        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800">Edit Student</h3>
        </div>
        <EditStudentForm setIsEditModalOpen={setIsEditModalOpen} />
      </div>
    </Modal>
  );
};

export default EditStudentModal;
