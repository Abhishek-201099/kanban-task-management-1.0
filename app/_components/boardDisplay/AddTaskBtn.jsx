"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";

import Modal from "@/app/_components/modal/Modal";
import CreateEditTaskForm from "./CreateEditTaskForm";

export default function AddTaskBtn({ boardColumns, tasks }) {
  return (
    <Modal>
      <Modal.Open opens="createTaskForm">
        <button className="flex items-center gap-2  bg-primary-700 hover:bg-primary-600 transition-all py-4 px-4 rounded-3xl">
          <span>
            <PlusCircleIcon className="h-7 w-7 " />
          </span>
          <span className="text-lg [word-spacing:4px] font-medium ">
            Add new task
          </span>
        </button>
      </Modal.Open>

      <Modal.Window name="createTaskForm">
        <CreateEditTaskForm boardColumns={boardColumns} tasks={tasks} />
      </Modal.Window>
    </Modal>
  );
}
