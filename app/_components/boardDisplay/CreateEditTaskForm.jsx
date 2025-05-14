import { usePathname } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { PlusCircleIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { addNewTaskAction, editTaskAction } from "@/app/_lib/actions";

export default function CreateEditTaskForm({
  boardColumns,
  tasks,
  curTask = {},
  subtaskForTask,
  onCloseModal,
}) {
  const pathName = usePathname();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      subtasks: subtaskForTask?.map((subtask) => {
        return { subtaskName: subtask?.subtaskName };
      }) || [{ subtaskName: "" }, { subtaskName: "" }],
    },
  });

  const { append, remove, fields } = useFieldArray({
    name: "subtasks",
    control,
    rules: {
      required: "Add at least one subtask",
    },
  });

  async function onSubmit(data) {
    const { taskCurrentStatus } = data;

    data.boardId = +pathName.split("/").at(2);

    data.columnId = boardColumns.find(
      (boardColumn) => boardColumn.columnName === taskCurrentStatus
    ).id;

    if (Object.keys(curTask).length === 0) {
      await addNewTaskAction(data);
    } else {
      await editTaskAction(data, curTask, subtaskForTask);
    }

    onCloseModal?.();
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg lg:text-xl font-bold [word-spacing:6px] text-accent-400 uppercase">
        {Object.keys(curTask).length === 0 ? "Add new task" : "Edit task"}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* TaskName */}
        <div className="flex flex-col gap-2 mb-2">
          <label
            htmlFor="taskName"
            className="text-xs md:text-sm lg:text-base text-primary-300"
          >
            Task name
          </label>
          <input
            type="text"
            id="taskName"
            defaultValue={curTask?.taskName ? curTask?.taskName : ""}
            {...register("taskName", {
              required: "This field is required",
              validate: (value) => {
                if (value.trim() === "")
                  return "Please provide a valid task name";

                const foundTask = tasks.find(
                  (task) =>
                    task.taskName.replace(/\s+/g, " ").toLowerCase().trim() ===
                    value.replace(/\s+/g, " ").toLowerCase().trim()
                );

                if (foundTask) {
                  if (foundTask.taskName === curTask?.taskName) {
                    return true;
                  } else {
                    return "Task already exists";
                  }
                }
              },
            })}
            placeholder="e.g. Refactor files"
            className="p-2 text-sm font-medium border rounded-md border-primary-50 text-primary-950  bg-primary-100 outline-none"
          />
          {errors?.taskName?.message && (
            <p className="text-sm md:text-base text-red-300 font-light [word-spacing:2px]">
              {errors?.taskName?.message}
            </p>
          )}
        </div>
        {/* Description */}
        <div className="flex flex-col gap-2 mb-2">
          <label
            htmlFor="taskDescription"
            className="text-xs md:text-sm lg:text-base text-primary-300"
          >
            Description
          </label>
          <textarea
            id="taskDescription"
            cols="30"
            rows="10"
            defaultValue={
              curTask?.taskDescription ? curTask?.taskDescription : ""
            }
            placeholder="description..."
            {...register("taskDescription", {
              required: "This field is required",
            })}
            className="p-2 text-sm font-medium border rounded-md border-primary-50 text-primary-950  bg-primary-100 outline-none"
          ></textarea>
          {errors?.taskDescription?.message && (
            <p className="text-sm md:text-base text-red-300 font-light [word-spacing:2px]">
              {errors?.taskDescription?.message}
            </p>
          )}
        </div>
        {/* Subtasks */}
        <div className="flex flex-col gap-4 max-h-[300px]">
          <label className="text-xs md:text-sm lg:text-base text-primary-300">
            Subtasks
          </label>
          <div className="flex flex-col gap-4 overflow-scroll scrollbar-hide">
            {fields.map((subtask, index) => (
              <div key={subtask.id}>
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    {...register(`subtasks.${[index]}.subtaskName`, {
                      required: "This field is required",
                    })}
                    placeholder={`e.g. Subtask ${index + 1}`}
                    className="p-2 text-sm font-medium border rounded-md border-primary-50 text-primary-950 bg-primary-100  outline-none flex-1"
                  />
                  <button onClick={() => remove(index)}>
                    <XMarkIcon className="h-8 w-8 text-primary-500 hover:text-primary-200" />
                  </button>
                </div>
                {errors?.subtasks?.[index]?.subtaskName?.message && (
                  <p className="text-sm md:text-base text-red-300 font-light [word-spacing:2px] mt-2">
                    {errors?.subtasks?.[index]?.subtaskName?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          {errors?.subtasks?.root?.message && (
            <p className="text-sm md:text-base text-red-300 font-light [word-spacing:2px]">
              {errors?.subtasks?.root?.message}
            </p>
          )}
          <button
            type="button"
            onClick={() => append({ subtaskName: "" })}
            className="flex items-center justify-center gap-4 bg-primary-700 rounded-3xl p-2 hover:bg-primary-600 transition-all"
          >
            <span>
              <PlusCircleIcon className="h-4 w-4 md:h-5 md:w-5" />
            </span>
            <span className="text-sm md:text-base lg:text-lg [word-spacing:4px]">
              Add subtask
            </span>
          </button>
        </div>

        {/* Current Status */}
        <div className="flex flex-col gap-2 mb-2">
          <label
            htmlFor="taskCurrentStatus"
            className="text-xs md:text-sm lg:text-base text-primary-300"
          >
            Current Status
          </label>

          <select
            id="taskCurrentStatus"
            {...register("taskCurrentStatus")}
            defaultValue={
              curTask?.columnId
                ? boardColumns.find(
                    (boardColumn) => boardColumn.id === curTask?.columnId
                  ).columnName
                : ""
            }
            className="p-2 text-sm font-medium border rounded-md border-primary-50 text-primary-950  bg-primary-100 outline-none"
          >
            {boardColumns.map((boardColumn, index) => {
              return (
                <option key={index} value={boardColumn.columnName}>
                  {boardColumn.columnName}
                </option>
              );
            })}
          </select>
        </div>

        {/* Add task */}
        <button
          type="submit"
          className="flex items-center justify-center gap-4 text-xl bg-primary-700 rounded-3xl p-2 hover:bg-primary-600 transition-all"
        >
          <span>
            <PlusIcon className="h-4 w-4 md:h-5 md:w-5" />
          </span>
          <span className="text-sm md:text-base lg:text-lg [word-spacing:4px]">
            {Object.keys(curTask).length === 0 ? "Add task" : "Edit task"}
          </span>
        </button>
      </form>
    </div>
  );
}
