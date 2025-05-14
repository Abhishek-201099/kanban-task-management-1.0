import { useFieldArray, useForm } from "react-hook-form";
import { PlusCircleIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { createNewBoardAction } from "@/app/_lib/actions";
import { useTransition } from "react";
import SpinnerMini from "../ui/SpinnerMini";

export default function CreateBoardForm({ boards, onCloseModal }) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      boardName: "",
      boardColumns: [{ columnName: "Todo" }, { columnName: "Doing" }],
    },
  });

  const { append, remove, fields } = useFieldArray({
    name: "boardColumns",
    control,
    rules: {
      required: "Add at least one column",
    },
  });

  async function onSubmit(data) {
    const { boardName, boardColumns } = data;
    startTransition(
      async () => await createNewBoardAction(boardName, boardColumns)
    );
    reset();
    onCloseModal();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-rows-[auto_auto_200px_auto] gap-y-6"
    >
      <p className="text-lg lg:text-xl font-bold [word-spacing:6px] text-accent-400 uppercase">
        Add new Board
      </p>

      <div className="flex flex-col gap-4 mb-2">
        <label
          htmlFor="boardName"
          className="text-xs md:text-sm lg:text-base text-primary-300 [word-spacing:6px]"
        >
          Board name
        </label>
        <input
          type="text"
          id="boardName"
          placeholder="e.g. Project Abacus"
          {...register("boardName", {
            required: "This field is required",
            validate: (value) => {
              if (value.trim() === "")
                return "Please provide a valid board name";
              const foundBoard = boards.find(
                (board) =>
                  board.boardName.replace(/\s+/g, " ").toLowerCase().trim() ===
                  value.replace(/\s+/g, " ").toLowerCase().trim()
              );
              if (foundBoard) return "The board name already exists";
            },
          })}
          className="p-2 text-sm font-medium border rounded-md border-primary-50 text-primary-950 bg-primary-100  outline-none"
        />
        {errors?.boardName?.message && (
          <p className="text-sm md:text-base text-red-300 font-light [word-spacing:2px]">
            {errors?.boardName?.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-xs md:text-sm lg:text-base text-primary-300 [word-spacing:6px]">
          Board columns
        </label>

        <div className="flex flex-col gap-4 overflow-scroll scrollbar-hide">
          {fields.map((column, index) => (
            <div key={column.id}>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  {...register(`boardColumns.${[index]}.columnName`, {
                    required: "This field is required",
                  })}
                  placeholder={`e.g. column ${index + 1}`}
                  className="p-2 text-sm font-medium border rounded-md border-primary-50 text-primary-950 bg-primary-100  outline-none flex-1"
                />
                <button onClick={() => remove(index)}>
                  <XMarkIcon className="h-8 w-8 text-primary-500 hover:text-primary-200" />
                </button>
              </div>
              {errors?.boardColumns?.[index]?.columnName?.message && (
                <p className="text-sm md:text-base text-red-300 font-light [word-spacing:2px] mt-2">
                  {errors?.boardColumns?.[index]?.columnName?.message}
                </p>
              )}
            </div>
          ))}
        </div>
        {errors?.boardColumns?.root?.message && (
          <p className="text-sm md:text-base text-red-300 font-light [word-spacing:2px]">
            {errors?.boardColumns?.root?.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <button
          type="button"
          onClick={() => append({ columnName: "" })}
          className="flex items-center justify-center gap-4 bg-primary-700 rounded-3xl p-2 hover:bg-primary-600 transition-all"
        >
          <span>
            <PlusCircleIcon className="h-4 w-4 md:h-5 md:w-5" />
          </span>
          <span className="text-sm md:text-base lg:text-lg [word-spacing:4px]">
            Add column
          </span>
        </button>

        <button
          disabled={isPending}
          type="submit"
          className="flex items-center justify-center gap-4 md:text-lg lg:text-xl bg-primary-700 rounded-3xl p-2 hover:bg-primary-600 transition-all"
        >
          {!isPending ? (
            <>
              <span>
                <PlusIcon className="h-4 w-4 md:h-5 md:w-5" />
              </span>
              <span className="text-sm md:text-base lg:text-lg [word-spacing:4px]">
                Create board
              </span>
            </>
          ) : (
            <>
              <span>
                <SpinnerMini />
              </span>
              <span className="text-sm md:text-base lg:text-lg [word-spacing:4px]">
                Creating board
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
