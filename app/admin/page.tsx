"use client";

import { currentStudentAtom } from "@/atoms/currentStudent";
import DeleteStudentModal from "@/components/modals/DeleteStudentModal";
import EditOrAddStudentModal from "@/components/modals/EditOrAddStudentModal";
import { useAtom } from "jotai";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";

export default function StudentsTable() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentStudentPhoneNumber, setCurrentStudentPhoneNumber] =
    useState("0");

  const TABLE_HEAD = useMemo(
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
      <div className="h-full w-full overflow-auto flex flex-col justify-center items-center">
        <table className="w-2/3 min-w-max table-auto text-left shadow-xl mb-10 mt-20 ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-300 p-4 "
                >
                  <p className="font-normal leading-none opacity-70">{head}</p>
                </th>
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
                        onClick={() => {
                          setIsEditModalOpen(true);
                          setCurrentStudentPhoneNumber(phoneNumber);
                        }}
                      >
                        Edit
                      </button>{" "}
                      <button
                        onClick={() => {
                          setIsDeleteModalOpen(true);
                          setCurrentStudentPhoneNumber(phoneNumber);
                        }}
                      >
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
          <button
            onClick={() => {
              alert("here");
              setIsAddModalOpen(true);
            }}
          >
            Add Student +
          </button>
        </div>
      </div>
      <DeleteStudentModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleDelete={handleDelete}
      />
      {isEditModalOpen && (
        <EditOrAddStudentModal
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          type="edit"
        />
      )}
      {isAddModalOpen && (
        <EditOrAddStudentModal
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
          type="add"
        />
      )}
    </>
  );
}
