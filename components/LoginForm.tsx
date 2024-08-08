"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { loginTeacher } from "@/lib/actions/teacher.actions";
import Spinner from "./Spinner";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
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

      const loginSuccess = await loginTeacher(teacher);

      if (loginSuccess) {
        return router.push("/admin/students");
      }

      setLoginError("Username or ID not valid");
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <>
      <h2 className="font-bold text-2xl text-[#002D74]">Login | Teacher</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="p-2 mt-8 rounded-xl border"
          type="text"
          placeholder="Username"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-500 text-xs">{errors.username.message}</p>
        )}
        <div className="relative">
          <input
            className="p-2 rounded-xl border w-full"
            type="text"
            {...register("teacherId")}
            placeholder="ID"
          />
        </div>
        {errors.teacherId && (
          <p className="text-red-500 text-xs">{errors.teacherId.message}</p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 flex justify-center gap-1 items-center"
        >
          Login {isLoading && <Spinner />}
        </button>
        {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
      </form>
    </>
  );
};

export default LoginForm;
