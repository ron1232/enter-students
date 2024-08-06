import React from "react";
import Modal from "../Modal";
import EditStudentForm from "../EditStudentForm";
import AddStudentForm from "../AddStudentForm";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  type: "Student" | "Assignment";
  group: "edit" | "add";
}

const EditOrAddModal = ({
  isModalOpen,
  setIsModalOpen,
  type,
  group,
}: Props) => {
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="text-center w-56">
        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800">
            {group === "edit" ? "Edit" : "Add"} {type}
          </h3>
        </div>

        {/* {type === "Student" ? (
          group === "add" ? (
            <AddStudentForm setIsAddModalOpen={setIsModalOpen} />
          ) : (
            <EditStudentForm setIsEditModalOpen={setIsModalOpen} />
          )
        ) : type === "Assignment" ? (
          group === "add" ? (
          <>
          </>
        ) : (
          <></>
        )} */}

        {/* type assignment */}
        {type === "Assignment" ? (
          group === "add" ? (
            <></>
          ) : (
            <></>
          )
        ) : /* type Student */
        group === "add" ? (
          <AddStudentForm setIsAddModalOpen={setIsModalOpen} />
        ) : (
          <EditStudentForm setIsEditModalOpen={setIsModalOpen} />
        )}
      </div>
    </Modal>
  );
};

export default EditOrAddModal;
