import { currentStudentAtom } from "@/atoms/currentStudent";
import { editStudent } from "@/lib/actions/teacher.actions";
import { EditStudentFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  setIsEditModalOpen: (open: boolean) => void;
}

const EditStudentForm = ({ setIsEditModalOpen }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStudent] = useAtom(currentStudentAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof EditStudentFormValidation>>({
    resolver: zodResolver(EditStudentFormValidation),
    defaultValues: {
      name: currentStudent?.name,
      classGrade: currentStudent?.classGrade,
      phoneNumber: currentStudent?.phoneNumber,
    },
  });

  const onSubmit = async ({
    name,
    classGrade,
    phoneNumber,
  }: z.infer<typeof EditStudentFormValidation>) => {
    setIsLoading(true);

    try {
      const student = {
        name,
        classGrade,
        phoneNumber,
      };

      const editStudentSuccess = await editStudent(student);

      if (editStudentSuccess) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }

    setIsEditModalOpen(false);
    setIsLoading(false);
  };

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
        </div>
        <div className="flex gap-4">
          <button
            className="btn btn-danger w-full"
            type="submit"
            disabled={isLoading}
          >
            Edit
          </button>
          <button
            className="btn btn-light w-full"
            onClick={() => setIsEditModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default EditStudentForm;
