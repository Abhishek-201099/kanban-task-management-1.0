"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";

import Modal from "@/app/_components/modal/Modal";
import CreateBoardForm from "./CreateBoardForm";

export default function AddBoard({ boards }) {
  return (
    <Modal>
      <Modal.Open opens="createBoardForm">
        <button className="flex items-center gap-4 rounded-br-full rounded-tr-full font-medium tracking-tighter [word-spacing:4px] text-accent-400 hover:bg-primary-800 px-6 py-5 hover:text-accent-300 transition-all">
          <span>
            <PlusCircleIcon className="h-7 w-7 " />
          </span>
          <span className="text-2xl">Create new board</span>
        </button>
      </Modal.Open>
      <Modal.Window name="createBoardForm">
        <CreateBoardForm boards={boards} />
      </Modal.Window>
    </Modal>
  );
}
