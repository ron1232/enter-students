import { addStudent, editStudent } from "@/lib/actions/student.actions";
import { IAssignment } from "@/lib/mongodb/models/Assignment";
import { IStudent } from "@/lib/mongodb/models/Student";
import { EditOrAddStudentFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { z } from "zod";

interface Props {
  setIsEditOrAddModalOpen: (open: boolean) => void;
  currentStudent?: IStudent | undefined;
  selectItems?: IAssignment[];
  group: "edit" | "add";
}

const EditOrAddStudentForm = ({
  setIsEditOrAddModalOpen,
  currentStudent,
  selectItems,
  group,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof EditOrAddStudentFormValidation>>({
    resolver: zodResolver(EditOrAddStudentFormValidation),
    defaultValues: {
      _id: currentStudent?._id as string,
      name: currentStudent?.name,
      classGrade: currentStudent?.classGrade,
      phoneNumber: currentStudent?.phoneNumber,
    },
  });

  const onSubmit = async ({
    _id,
    name,
    classGrade,
    phoneNumber,
  }: z.infer<typeof EditOrAddStudentFormValidation>) => {
    setIsLoading(true);

    try {
      const student = {
        name,
        classGrade,
        phoneNumber,
        ...(_id && { _id }),
      };

      if (group === "add") {
        const addStudentSuccess = await addStudent(student);

        if (addStudentSuccess) {
          window.location.reload();
        }
      } else {
        const editStudentSuccess = await editStudent(student as IStudent);

        if (editStudentSuccess) {
          window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsEditOrAddModalOpen(false);
    setIsLoading(false);
  };

  const assignmentOptions = useMemo(
    () =>
      selectItems?.map((item) => ({
        value: item._id,
        label: item.title,
      })),
    [selectItems]
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mb-5">
          <input
            className="p-2 rounded-xl border w-full"
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}
          <input
            className="p-2 rounded-xl border w-full"
            type="text"
            placeholder="Grade"
            {...register("classGrade")}
          />
          {errors.classGrade && (
            <p className="text-red-500 text-xs">{errors.classGrade.message}</p>
          )}
          <input
            className="p-2 rounded-xl border w-full"
            type="text"
            placeholder="Phone Number"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
          )}
          <Select
            isMulti
            name="colors"
            options={assignmentOptions}
            className="basic-multi-select text-left"
            classNamePrefix="select"
          />
        </div>
        <div className="flex gap-4">
          <button
            className="btn btn-danger w-full"
            type="submit"
            disabled={isLoading}
          >
            {group === "add" ? "Add" : "Edit"}
          </button>
          <button
            className="btn btn-light w-full"
            onClick={() => setIsEditOrAddModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default EditOrAddStudentForm;
