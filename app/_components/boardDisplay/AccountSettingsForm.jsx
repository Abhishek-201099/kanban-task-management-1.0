"use client";

import { useTransition } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";

import SpinnerMini from "@/app/_components/ui/SpinnerMini";
import { updateAccountAction } from "@/app/_lib/actions";

export default function AccountSettingsForm({ account }) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: account.fullName,
      email: account.email,
    },
  });

  async function onSubmit(data) {
    startTransition(async () => await updateAccountAction(data));
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-12 px-6  py-10 bg-primary-900 md:w-[500px] lg:w-[700px] rounded-xl"
    >
      <div className="flex flex-col gap-6">
        <label
          htmlFor="fullName"
          className="text-lg lg:text-xl text-primary-300"
        >
          Full name
        </label>
        <input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This field is required",
            validate: (value) => {
              if (value.trim() === "") return "Please provide a valid name";

              if (
                value.replace(/\s+/g, " ").toLowerCase().trim() ===
                account.fullName.replace(/\s+/g, " ").toLowerCase().trim()
              )
                return "New account name cannot be same as old";
            },
          })}
          placeholder="e.g. Abhishek Bhattacharjee"
          className="p-2 text-sm font-medium border rounded-md border-primary-50 text-primary-950  outline-none"
        />
        {errors?.fullName?.message && (
          <p className="text-sm md:text-base text-red-300 font-light [word-spacing:2px]">
            {errors?.fullName?.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <label
          htmlFor="email"
          className="text-xs md:text-sm lg:text-base text-primary-300"
        >
          Email
        </label>
        <input
          disabled
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
          })}
          placeholder="e.g. xyz@gmail.com"
          className="p-2 text-sm font-medium border rounded-md border-none text-primary-950  outline-none cursor-not-allowed"
        />
      </div>

      <button
        disabled={isPending}
        type="submit"
        className="flex items-center justify-center gap-4 text-xl bg-primary-700 rounded-3xl p-2 hover:bg-primary-600 transition-all disabled:cursor-not-allowed"
      >
        {!isPending ? (
          <>
            <span>
              <ArrowPathIcon className="h-4 w-4 md:h-5 md:w-5" />
            </span>
            <span className="text-sm md:text-base lg:text-lg [word-spacing:4px]">
              Update profile
            </span>
          </>
        ) : (
          <>
            <span>
              <SpinnerMini />
            </span>
            <span className="text-sm md:text-base lg:text-lg [word-spacing:4px]">
              Updating
            </span>
          </>
        )}
      </button>
    </form>
  );
}
