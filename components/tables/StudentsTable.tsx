"use client";

import { currentStudentAtom } from "@/atoms/currentStudent";
import DeleteModal from "@/components/modals/DeleteModal";
import EditOrAddModal from "@/components/modals/EditOrAddModal";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { CiTrash, CiEdit } from "react-icons/ci";
import Th from "@/components/Th";
import AddButton from "../AddButton";

export default function StudentsTable() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentStudentPhoneNumber, setCurrentStudentPhoneNumber] =
    useState("0");

  const studentsTableHead = useMemo(
    () => ["Name", "Grade", "Phone Number", "Action"],
    []
  );

  const [students, setStudents] = useState([
    {
      name: "John Michael",
      classGrade: "First Grade",
      phoneNumber: "0546501629",
    },
    {
      name: "Alexa Liras",
      classGrade: "First Grade",
      phoneNumber: "0541111689",
    },
    {
      name: "Laurent Perrier",
      classGrade: "Second Grade",
      phoneNumber: "0522211629",
    },
    {
      name: "Michael Levi",
      classGrade: "Seventh Grade",
      phoneNumber: "0526984752",
    },
    {
      name: "Richard Gran",
      classGrade: "First Grade",
      phoneNumber: "052694157",
    },
  ]);

  const [_, setCurrentStudent] = useAtom(currentStudentAtom);

  // set atom
  useMemo(() => {
    const currentStudent = students.find(
      (student) => student.phoneNumber === currentStudentPhoneNumber
    );
    setCurrentStudent(currentStudent);
  }, [currentStudentPhoneNumber]);

  const handleDelete = () => {
    const updatedStudents = students.filter(
      (student) => student.phoneNumber !== currentStudentPhoneNumber
    );
    setStudents(updatedStudents);
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
          {students.map(({ name, classGrade, phoneNumber }, index) => {
            const isLast = index === students.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-gray-500";

            return (
              <tr key={name}>
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
                        setIsEditModalOpen(true);
                        setCurrentStudentPhoneNumber(phoneNumber);
                      }}
                    >
                      <CiEdit color="gray" />
                      Edit
                    </button>{" "}
                    <button
                      className="flex items-center"
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setCurrentStudentPhoneNumber(phoneNumber);
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
        />
      )}
      {isAddModalOpen && (
        <EditOrAddModal
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
          type="Student"
          group="add"
        />
      )}
    </>
  );
}
