import { useFieldArray, useForm } from "react-hook-form";
import { PlusCircleIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { createNewBoardAction } from "@/app/_lib/actions";

export default function CreateBoardForm({ boards, onCloseModal }) {
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
    await createNewBoardAction(boardName, boardColumns);
    onCloseModal();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-rows-[auto_auto_200px_auto] gap-y-8  "
    >
      <p className="text-4xl font-bold [word-spacing:6px] text-accent-400 uppercase">
        Add new Board
      </p>

      <div className="flex flex-col gap-2 mb-2">
        <label htmlFor="boardName" className="text-xl text-primary-300">
          Board name
        </label>
        <input
          type="text"
          id="boardName"
          placeholder="e.g. Project Abacus"
          {...register("boardName", {
            required: "This field is required",
            validate: (value) => {
              const foundBoard = boards.find(
                (board) =>
                  board.boardName.toLowerCase().trim() ===
                  value.toLowerCase().trim()
              );
              if (foundBoard) return "The board name already exists";
            },
          })}
          className="p-4 text-xl font-medium border rounded-md border-primary-50 text-primary-950  outline-none"
        />
        {errors?.boardName?.message && (
          <p className="text-lg text-red-300 font-light [word-spacing:2px]">
            {errors?.boardName?.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-xl text-primary-300">Board columns</label>

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
                  className="p-4 text-xl font-medium border rounded-md border-primary-50 text-primary-950  outline-none flex-1"
                />
                <button onClick={() => remove(index)}>
                  <XMarkIcon className="h-8 w-8 text-primary-500 hover:text-primary-200" />
                </button>
              </div>
              {errors?.boardColumns?.[index]?.columnName?.message && (
                <p className="text-lg text-red-300 font-light [word-spacing:2px] mt-2">
                  {errors?.boardColumns?.[index]?.columnName?.message}
                </p>
              )}
            </div>
          ))}
        </div>
        {errors?.boardColumns?.root?.message && (
          <p className="text-lg text-red-300 font-light [word-spacing:2px]">
            {errors?.boardColumns?.root?.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <button
          type="button"
          onClick={() => append({ columnName: "" })}
          className="flex items-center justify-center gap-4 bg-primary-700 rounded-3xl p-4 hover:bg-primary-600 transition-all"
        >
          <span>
            <PlusCircleIcon className="h-7 w-7 " />
          </span>
          <span className="text-xl">Add column</span>
        </button>

        <button
          type="submit"
          className="flex items-center justify-center gap-4 text-xl bg-primary-700 rounded-3xl p-4 hover:bg-primary-600 transition-all"
        >
          <span>
            <PlusIcon className="h-7 w-7" />
          </span>
          <span>Create board</span>
        </button>
      </div>
    </form>
  );
}
