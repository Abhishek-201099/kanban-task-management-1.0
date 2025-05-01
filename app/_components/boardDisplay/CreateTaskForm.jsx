import { usePathname } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { PlusCircleIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { addNewTaskAction } from "@/app/_lib/actions";

export default function CreateTaskForm({ boardColumns, tasks, onCloseModal }) {
  const pathName = usePathname();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      subtasks: [{ subtaskName: "" }, { subtaskName: "" }],
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

    await addNewTaskAction(data);

    reset();
    onCloseModal();
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-4xl font-bold [word-spacing:6px] text-accent-400 uppercase">
        Add new task
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* TaskName */}
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="taskName" className="text-xl text-primary-300">
            Task name
          </label>
          <input
            type="text"
            id="taskName"
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
                if (foundTask) return "Task already exists";
              },
            })}
            placeholder="e.g. Refactor files"
            className="p-4 text-xl font-medium border rounded-md border-primary-50 text-primary-950  outline-none"
          />
          {errors?.taskName?.message && (
            <p className="text-lg text-red-300 font-light [word-spacing:2px]">
              {errors?.taskName?.message}
            </p>
          )}
        </div>
        {/* Description */}
        <div className="flex flex-col gap-2 mb-2">
          <label htmlFor="taskDescription" className="text-xl text-primary-300">
            Description
          </label>
          <textarea
            id="taskDescription"
            cols="30"
            rows="10"
            placeholder="description..."
            {...register("taskDescription", {
              required: "This field is required",
            })}
            className="p-4 text-xl font-medium border rounded-md border-primary-50 text-primary-950  outline-none"
          ></textarea>
          {errors?.taskDescription?.message && (
            <p className="text-lg text-red-300 font-light [word-spacing:2px]">
              {errors?.taskDescription?.message}
            </p>
          )}
        </div>
        {/* Subtasks */}
        <div className="flex flex-col gap-4 max-h-[300px]">
          <label className="text-xl text-primary-300">Subtasks</label>
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
                    className="p-4 text-xl font-medium border rounded-md border-primary-50 text-primary-950  outline-none flex-1"
                  />
                  <button onClick={() => remove(index)}>
                    <XMarkIcon className="h-8 w-8 text-primary-500 hover:text-primary-200" />
                  </button>
                </div>
                {errors?.subtasks?.[index]?.subtaskName?.message && (
                  <p className="text-lg text-red-300 font-light [word-spacing:2px] mt-2">
                    {errors?.subtasks?.[index]?.subtaskName?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          {errors?.subtasks?.root?.message && (
            <p className="text-lg text-red-300 font-light [word-spacing:2px]">
              {errors?.subtasks?.root?.message}
            </p>
          )}
          <button
            type="button"
            onClick={() => append({ subtaskName: "" })}
            className="flex items-center justify-center gap-4 bg-primary-700 rounded-3xl p-4 hover:bg-primary-600 transition-all"
          >
            <span>
              <PlusCircleIcon className="h-7 w-7" />
            </span>
            <span className="text-xl">Add subtask</span>
          </button>
        </div>

        {/* Current Status */}
        <div className="flex flex-col gap-2 mb-2">
          <label
            htmlFor="taskCurrentStatus"
            className="text-xl text-primary-300"
          >
            Current Status
          </label>

          <select
            id="taskCurrentStatus"
            {...register("taskCurrentStatus")}
            className="p-4 text-xl font-medium border rounded-md border-primary-50 text-primary-950  outline-none"
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
          className="flex items-center justify-center gap-4 text-xl bg-primary-700 rounded-3xl p-4 hover:bg-primary-600 transition-all"
        >
          <span>
            <PlusIcon className="h-7 w-7" />
          </span>
          <span>Add task</span>
        </button>
      </form>
    </div>
  );
}
