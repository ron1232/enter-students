import React from "react";
import Modal from "../Modal";

interface Props {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (open: boolean) => void;
  handleDelete: () => void;
}

const DeleteStudentModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  handleDelete,
}: Props) => {
  return (
    <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
      <div className="text-center w-56">
        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this item?
          </p>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-danger w-full" onClick={handleDelete}>
            Delete
          </button>
          <button
            className="btn btn-light w-full"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteStudentModal;
