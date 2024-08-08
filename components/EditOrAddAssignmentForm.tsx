import {
  addAssignment,
  editAssignment,
} from "@/lib/actions/assignments.actions";
import { IAssignment } from "@/lib/mongodb/models/Assignment";
import { EditOrAddAssignmentFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
        const addAssignmentSuccess = await addAssignment(assignment);

        if (addAssignmentSuccess) {
          window.location.reload();
        }
      } else {
        const editAssignmentSuccess = await editAssignment(
          assignment as IAssignment
        );

        if (editAssignmentSuccess) {
          window.location.reload();
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
          <input
            className="p-2 rounded-xl border w-full"
            type="text"
            placeholder="Name"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-xs">{errors.title.message}</p>
          )}
          <textarea
            className="p-2 rounded-xl border w-full"
            placeholder="Body"
            {...register("body")}
          />
          {errors.body && (
            <p className="text-red-500 text-xs">{errors.body.message}</p>
          )}
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
