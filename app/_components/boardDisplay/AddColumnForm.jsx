"use client";

import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

import { addNewColumnAction } from "@/app/_lib/actions";
import { useTransition } from "react";
import SpinnerMini from "../ui/SpinnerMini";

export default function AddColumnForm({ boardColumns, onCloseModal }) {
  const [isPending, startTransition] = useTransition();
  const boardId = +usePathname().split("/").at(2);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function onSubmit(data) {
    data.boardId = boardId;
    startTransition(async () => {
      await addNewColumnAction(data);
      onCloseModal();
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <label
        htmlFor="newColumn"
        className="text-xs md:text-sm lg:text-base font-semibold text-accent-300 [word-spacing:2px]"
      >
        Column name
      </label>
      <input
        type="text"
        {...register("newColumn", {
          required: "Please enter the column name",
          validate: (value) => {
            if (value.trim() === "")
              return "Please provide a valid column name";

            const foundColumn = boardColumns.find(
              (boardColumn) =>
                boardColumn.columnName
                  .replace(/\s+/g, " ")
                  .toLowerCase()
                  .trim() === value.replace(/\s+/g, " ").toLowerCase().trim()
            );
            if (foundColumn) return "Column name already exists";
          },
        })}
        placeholder="e.g. In progress"
        className="p-2 text-sm font-medium border rounded-md border-primary-50 text-primary-950 bg-primary-100 outline-none"
      />
      {errors?.newColumn?.message && (
        <p className="text-sm md:text-base text-red-300 font-light [word-spacing:2px]">
          {errors?.newColumn?.message}
        </p>
      )}

      <button
        disabled={isPending}
        type="submit"
        className="flex items-center justify-center gap-4 text-xl bg-primary-700 rounded-3xl p-2 hover:bg-primary-600 transition-all [word-spacing:4px]"
      >
        {!isPending ? (
          <>
            <span>
              <ArrowPathIcon className="h-4 w-4 md:h-5 md:w-5" />
            </span>
            <span className="text-sm md:text-base lg:text-lg [word-spacing:4px]">
              Add column
            </span>
          </>
        ) : (
          <>
            <span>
              <SpinnerMini />
            </span>
            <span className="text-sm md:text-base lg:text-lg [word-spacing:4px]">
              Adding column
            </span>
          </>
        )}
      </button>
    </form>
  );
}
