"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";

import Modal from "@/app/_components/modal/Modal";
import CreateEditTaskForm from "./CreateEditTaskForm";

export default function AddTaskBtn({ boardColumns, tasks }) {
  return (
    <Modal>
      <Modal.Open opens="createTaskForm">
        <button className="flex items-center gap-2  bg-primary-700 hover:bg-primary-600 transition-all px-4 py-2 rounded-xl md:rounded-3xl">
          <span>
            <PlusCircleIcon className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
          </span>
          <span className="text-sm hidden md:block [word-spacing:4px] font-medium ">
            Add task
          </span>
        </button>
      </Modal.Open>

      <Modal.Window name="createTaskForm">
        <CreateEditTaskForm boardColumns={boardColumns} tasks={tasks} />
      </Modal.Window>
    </Modal>
  );
}
