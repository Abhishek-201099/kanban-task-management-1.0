"use client";

import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

import { addNewColumnAction } from "@/app/_lib/actions";

export default function AddColumnForm({ boardColumns, onCloseModal }) {
  const boardId = +usePathname().split("/").at(2);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function onSubmit(data) {
    data.boardId = boardId;
    await addNewColumnAction(data);
    onCloseModal();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <label
        htmlFor="newColumn"
        className="text-2xl font-semibold text-accent-300 [word-spacing:2px]"
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
        className="p-4 text-xl font-medium border rounded-md border-primary-50 text-primary-950  outline-none"
      />
      {errors?.newColumn?.message && (
        <p className="text-lg text-red-300 font-light [word-spacing:2px]">
          {errors?.newColumn?.message}
        </p>
      )}

      <button
        type="submit"
        className="flex items-center justify-center gap-4 text-xl bg-primary-700 rounded-3xl p-4 hover:bg-primary-600 transition-all [word-spacing:4px]"
      >
        <span>
          <ArrowPathIcon className="h-8 w-8" />
        </span>
        <span>Add column</span>
      </button>
    </form>
  );
}
