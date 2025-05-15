import { useState, useTransition } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

import { updateTaskAction } from "@/app/_lib/actions";
import SpinnerMini from "../ui/SpinnerMini";

export default function TaskInfo({
  task,
  subtaskForTask,
  boardColumns,
  onCloseModal,
}) {
  const [isPending, startTransition] = useTransition();

  const [currentStatus, setCurrentStatus] = useState(
    boardColumns.find((boardColumn) => boardColumn.id === task.columnId)
      .columnName
  );

  const [subtasks, setSubtasks] = useState(subtaskForTask);

  async function handleSubmit(e) {
    e.preventDefault();

    const selectedColumn = boardColumns.find(
      (boardColumn) => boardColumn.columnName === currentStatus
    );

    startTransition(async () => {
      await updateTaskAction(selectedColumn, subtasks, task);
      onCloseModal?.();
    });
  }

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col gap-10">
      <h3 className="text-xl md:text-2xl font-semibold text-accent-300 [word-spacing:2px]">
        {task.taskName}
      </h3>

      <p className="text-sm md:text-lg  text-primary-200 [word-spacing:2px]">
        {task.taskDescription}
      </p>

      <div className="flex flex-col gap-4 [word-spacing:4px]">
        <p className="text-base md:text-xl  text-primary-200 ">
          Subtasks (
          {subtasks.filter((subtask) => subtask.isChecked === true).length} of{" "}
          {subtaskForTask.length})
        </p>
        {subtasks.map((subtask, index) => {
          return (
            <div
              key={index}
              className="flex gap-4 items-center bg-primary-800 py-2 px-4 rounded-lg"
            >
              <input
                type="checkbox"
                className="h-4 w-4 md:h-5 md:w-5"
                checked={subtask.isChecked}
                onChange={() => {
                  setSubtasks((subtasks) => {
                    const updatedSubtasks = subtasks.map((item) => {
                      if (item.id === subtask.id)
                        return { ...item, isChecked: !item.isChecked };
                      return item;
                    });

                    return updatedSubtasks;
                  });
                }}
              />
              <label
                className={`p-2 text-sm ${subtask.isChecked ? "line-through" : ""}`}
              >
                {subtask.subtaskName}
              </label>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-base md:text-xl  text-primary-200 ">
          Current status
        </p>
        <select
          value={currentStatus}
          onChange={(e) => setCurrentStatus(e.target.value)}
          className="p-2 text-sm font-medium border rounded-md border-primary-50 text-primary-950  outline-none"
        >
          {boardColumns.map((boardColumn, index) => (
            <option key={index} value={boardColumn.columnName}>
              {boardColumn.columnName}
            </option>
          ))}
        </select>
      </div>

      <button
        disabled={isPending}
        className="flex items-center justify-center gap-4 text-xl bg-primary-700 rounded-3xl p-2 hover:bg-primary-600 transition-all"
      >
        {!isPending ? (
          <>
            <span>
              <ArrowPathIcon className="h-4 w-4 md:h-5 md:w-5" />
            </span>
            <span className="text-sm md:text-base lg:text-lg [word-spacing:4px]">
              Update task
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
