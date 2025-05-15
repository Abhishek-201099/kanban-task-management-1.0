import { editColumnNameAction } from "@/app/_lib/actions";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import SpinnerMini from "../ui/SpinnerMini";

export default function EditColumnNameForm({
  boardColumn,
  boardColumns,
  onCloseModal,
}) {
  const [isPending, startTransition] = useTransition();
  const boardId = +usePathname().split("/").at(2);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      updatedColumnName: boardColumn.columnName,
    },
  });

  async function onSubmit(data) {
    data.boardId = boardId;
    data.columnId = boardColumn.id;
    startTransition(async () => {
      await editColumnNameAction(data);
      onCloseModal?.();
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <label
        htmlFor="updatedColumnName"
        className="text-xs md:text-sm lg:text-base font-semibold text-accent-300 [word-spacing:2px]"
      >
        Column name
      </label>
      <input
        type="text"
        {...register("updatedColumnName", {
          required: "Please enter the column name",
          validate: (value) => {
            if (value.trim() === "")
              return "Please provide a valid column name";
            if (
              boardColumn.columnName.toLowerCase().trim() ===
              value.toLowerCase().trim()
            )
              return "New column name cannot be same as old column";

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
        placeholder="e.g Todo"
        className="p-2 text-sm  font-medium border rounded-md border-primary-50 text-primary-950 bg-primary-100 outline-none"
      />
      {errors?.updatedColumnName?.message && (
        <p className="text-sm md:text-base text-red-300 font-light [word-spacing:2px]">
          {errors?.updatedColumnName?.message}
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
              Update column name
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
