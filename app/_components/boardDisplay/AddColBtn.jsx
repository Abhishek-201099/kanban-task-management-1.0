"use client";

import { ViewColumnsIcon } from "@heroicons/react/24/solid";
import Modal from "@/app/_components/modal/Modal";
import AddColumnForm from "./AddColumnForm";

export default function AddColBtn({ boardColumns }) {
  return (
    <Modal>
      <div className="min-w-[400px] p-4 bg-primary-900 rounded-xl flex items-center justify-center hover:bg-primary-800 transition-all shadow-md shadow-primary-900">
        <Modal.Open opens="addColumnForm">
          <button className="flex gap-2 items-center cursor-pointer text-xl text-primary-500 hover:text-primary-400 transition-all  font-bold [word-spacing:4px]">
            <span>
              <ViewColumnsIcon className="h-6 w-6" />
            </span>
            <span>Add column</span>
          </button>
        </Modal.Open>
        <Modal.Window name="addColumnForm">
          <AddColumnForm boardColumns={boardColumns} />
        </Modal.Window>
      </div>
    </Modal>
  );
}
