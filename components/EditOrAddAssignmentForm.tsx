import {
  addAssignment,
  editAssignment,
} from "@/lib/actions/assignments.actions";
import { IAssignment } from "@/lib/mongodb/models/Assignment";
import { EditOrAddAssignmentFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";

interface Props {
  setIsEditOrAddModalOpen: (open: boolean) => void;
  currentAssignment?: IAssignment | undefined;
  group: "edit" | "add";
}

const EditOrAddAssignmentForm = ({
  setIsEditOrAddModalOpen,
  currentAssignment,
  group,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof EditOrAddAssignmentFormValidation>>({
    resolver: zodResolver(EditOrAddAssignmentFormValidation),
    defaultValues: {
      _id: currentAssignment?._id as string,
      title: currentAssignment?.title,
      body: currentAssignment?.body,
    },
  });

  const onSubmit = async ({
    _id,
    title,
    body,
  }: z.infer<typeof EditOrAddAssignmentFormValidation>) => {
    setIsLoading(true);

    try {
      const assignment = {
        title,
        body,
        ...(_id && { _id }),
      };

      if (group === "add") {
        const addAssignmentSuccessOrFail = await addAssignment(
          assignment as IAssignment
        );

        if (addAssignmentSuccessOrFail === true) {
          return window.location.reload();
        }

        if (addAssignmentSuccessOrFail) {
          toast.error(addAssignmentSuccessOrFail?.errorMessage);
        }
      } else {
        const editAssignmentSuccessOrFail = await editAssignment(
          assignment as IAssignment
        );

        if (editAssignmentSuccessOrFail === true) {
          return window.location.reload();
        }

        if (editAssignmentSuccessOrFail) {
          toast.error(editAssignmentSuccessOrFail?.errorMessage);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsEditOrAddModalOpen(false);
    setIsLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mb-5">
          {errors.title && (
            <p className="text-red-500 text-xs text-left">
              {errors.title.message}
            </p>
          )}
          <input
            className="p-2 rounded-xl border w-full"
            type="text"
            placeholder="Title"
            {...register("title")}
          />
          {errors.body && (
            <p className="text-red-500 text-xs text-left">
              {errors.body.message}
            </p>
          )}
          <textarea
            className="p-2 rounded-xl border w-full"
            placeholder="Body"
            {...register("body")}
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

export default EditOrAddAssignmentForm;
