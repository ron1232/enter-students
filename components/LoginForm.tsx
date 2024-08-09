"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      username: "",
      teacherId: "",
    },
  });

  const onSubmit = async ({
    username,
    teacherId,
  }: z.infer<typeof LoginFormValidation>) => {
    setIsLoading(true);

    try {
      const teacher = {
        username: username,
        teacherId: teacherId,
      };

      const response = await signIn("credentials", {
        ...teacher,
        callbackUrl: "",
        redirect: false,
      });

      if (!response?.error) {
        return router.push("/admin/students");
      }

      toast.error("Username or ID not valid");
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <h2 className="font-bold text-2xl text-[#002D74]">Login | Teacher</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {errors.username && (
          <p className="text-red-500 text-xs relative top-8">
            {errors.username.message}
          </p>
        )}
        <input
          className="p-2 mt-8 rounded-xl border"
          type="text"
          placeholder="Username"
          {...register("username")}
        />
        {errors.teacherId && (
          <p className="text-red-500 text-xs">{errors.teacherId.message}</p>
        )}
        <div className="relative">
          <input
            className="p-2 rounded-xl border w-full"
            type="text"
            {...register("teacherId")}
            placeholder="ID"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 flex justify-center gap-1 items-center"
        >
          Login {isLoading && <Spinner />}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
