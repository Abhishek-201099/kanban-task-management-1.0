import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

import { updateBoardNameAction } from "@/app/_lib/actions";

export default function UpdateBoardNameForm({ boards, onCloseModal }) {
  const boardId = +usePathname().split("/").at(2);
  const board = boards.find((board) => board.id === boardId);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      updatedBoardName: board.boardName,
    },
  });

  async function onSubmit(data) {
    data.boardId = boardId;
    await updateBoardNameAction(data);
    onCloseModal();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <label
        htmlFor="updatedBoardName"
        className="text-2xl font-semibold text-accent-300 [word-spacing:2px]"
      >
        Board name
      </label>
      <input
        type="text"
        {...register("updatedBoardName", {
          required: "Please enter the board name",
          validate: (value) => {
            if (value.trim() === "") return "Please provide a valid board name";
            if (
              board.boardName.toLowerCase().trim() ===
              value.toLowerCase().trim()
            )
              return "New board name cannot be same as old board";

            const foundBoard = boards.find(
              (board) =>
                board.boardName.replace(/\s+/g, " ").toLowerCase().trim() ===
                value.replace(/\s+/g, " ").toLowerCase().trim()
            );
            if (foundBoard) return "Board name already exists";
          },
        })}
        placeholder="e.g Project Abacus"
        className="p-4 text-xl font-medium border rounded-md border-primary-50 text-primary-950  outline-none"
      />
      {errors?.updatedBoardName?.message && (
        <p className="text-lg text-red-300 font-light [word-spacing:2px]">
          {errors?.updatedBoardName?.message}
        </p>
      )}

      <button
        type="submit"
        className="flex items-center justify-center gap-4 text-xl bg-primary-700 rounded-3xl p-4 hover:bg-primary-600 transition-all [word-spacing:4px]"
      >
        <span>
          <ArrowPathIcon className="h-8 w-8" />
        </span>
        <span>Update board name</span>
      </button>
    </form>
  );
}
