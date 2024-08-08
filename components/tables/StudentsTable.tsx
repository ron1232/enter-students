"use client";

import DeleteModal from "@/components/modals/DeleteModal";
import EditOrAddModal from "@/components/modals/EditOrAddModal";
import { useMemo, useState } from "react";
import { CiTrash, CiEdit } from "react-icons/ci";
import Th from "@/components/Th";
import AddButton from "../AddButton";
import { IStudent } from "@/lib/mongodb/models/Student";
import { deleteStudent } from "@/lib/actions/student.actions";
import { IAssignment } from "@/lib/mongodb/models/Assignment";

interface Props {
  students: IStudent[];
  assignments: IAssignment[];
}

export default function StudentsTable({ students, assignments }: Props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState("0");
  const [currentStudents, setCurrentStudents] = useState(students);

  const studentsTableHead = useMemo(
    () => ["Name", "Grade", "Phone Number", "Action"],
    []
  );

  const [currentStudent, setCurrentStudent] = useState<Student | undefined>({
    name: "",
    classGrade: "",
    phoneNumber: "",
  });

  // set atom
  useMemo(() => {
    const currentStudent = currentStudents.find(
      (student) => student._id === currentStudentId
    );
    setCurrentStudent(currentStudent);
  }, [currentStudentId]);

  const handleDelete = async () => {
    await deleteStudent(currentStudentId);

    const updatedStudents = currentStudents.filter(
      (student) => student._id !== currentStudentId
    );
    setCurrentStudents(updatedStudents);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <h3 className="self-start w-2/3 mx-auto mb-3 underline">
        Students Table:
      </h3>
      <table className="w-2/3 min-w-max table-auto text-left shadow-xl mb-10 ">
        <thead>
          <tr>
            {studentsTableHead.map((head) => (
              <Th key={head} head={head} />
            ))}
          </tr>
        </thead>
        <tbody>
          {currentStudents.map(
            ({ name, classGrade, phoneNumber, _id }, index) => {
              const isLast = index === students.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-gray-500";

              return (
                <tr key={_id as string}>
                  <td className={classes}>
                    <p className="font-normal">{name}</p>
                  </td>

                  <td className={classes}>
                    <p className="font-normal">{classGrade}</p>
                  </td>
                  <td className={classes}>
                    <p className="font-normal">{phoneNumber}</p>
                  </td>
                  <td className={classes}>
                    <div className="flex gap-5">
                      <button
                        className="flex items-center"
                        onClick={() => {
                          setCurrentStudentId(_id as string);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <CiEdit color="gray" />
                        Edit
                      </button>{" "}
                      <button
                        className="flex items-center"
                        onClick={() => {
                          setCurrentStudentId(_id as string);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <CiTrash color="red" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <div>
        <AddButton
          text="Add A Student"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleDelete={handleDelete}
        type="Student"
      />
      {isEditModalOpen && (
        <EditOrAddModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          type="Student"
          group="edit"
          currentItem={currentStudent}
          selectItems={assignments}
        />
      )}
      {isAddModalOpen && (
        <EditOrAddModal
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
          type="Student"
          group="add"
          selectItems={assignments}
        />
      )}
    </>
  );
}
