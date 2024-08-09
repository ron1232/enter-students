import { addStudent, editStudent } from "@/lib/actions/student.actions";
import { IAssignment } from "@/lib/mongodb/models/Assignment";
import { IStudent } from "@/lib/mongodb/models/Student";
import { classGradeOptions } from "@/lib/utils";
import { EditOrAddStudentFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { z } from "zod";

import { toast } from "react-toastify";

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
      classGrade: currentStudent?.classGrade || "Select Grade",
      phoneNumber: currentStudent?.phoneNumber,
    },
  });

  const onSubmit = async ({
    _id,
    name,
    classGrade,
    phoneNumber,
  }: z.infer<typeof EditOrAddStudentFormValidation>) => {
    console.log(classGrade);
    setIsLoading(true);

    try {
      const student = {
        name,
        classGrade,
        phoneNumber,
        ...(_id && { _id }),
      };

      if (group === "add") {
        const addStudentSuccessOrFail = await addStudent(student as IStudent);

        if (addStudentSuccessOrFail === true) {
          return window.location.reload();
        }

        toast.error(addStudentSuccessOrFail?.errorMessage);
      } else {
        const editStudentSuccessOrFail = await editStudent(student as IStudent);

        if (editStudentSuccessOrFail === true) {
          return window.location.reload();
        }

        toast.error(editStudentSuccessOrFail?.errorMessage);
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
          {errors.name && (
            <p className="text-red-500 text-xs text-left">
              {errors.name.message}
            </p>
          )}
          <input
            className="p-2 rounded-xl border w-full"
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors.classGrade && (
            <p className="text-red-500 text-xs text-left">
              {errors.classGrade.message}
            </p>
          )}
          <select
            className="p-2 rounded-xl border w-full bg-white"
            {...register("classGrade", { required: true })}
          >
            <option value="Select Grade" disabled>
              Select Grade
            </option>
            {classGradeOptions.map((classGrade) => (
              <option key={classGrade.value} value={classGrade.value}>
                {classGrade.label}
              </option>
            ))}
          </select>
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs text-left">
              {errors.phoneNumber.message}
            </p>
          )}
          <input
            className="p-2 rounded-xl border w-full"
            type="text"
            placeholder="Phone Number"
            {...register("phoneNumber")}
          />
          <Select
            isMulti
            name="assignments"
            options={assignmentOptions}
            className="basic-multi-select text-left"
            classNamePrefix="select"
          />
          {/* <Controller
            name="assignments"
            control={control}
            defaultValue={undefined}
            render={({ field }) => (
              <Select
                isMulti
                {...field}
                className="basic-multi-select text-left"
                options={assignmentOptions}
                onChange={(selectedOption) => field.onChange(selectedOption)}
                value={field.value}
              />
            )}
          /> */}
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
