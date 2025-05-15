"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import AddTaskBtn from "./AddTaskBtn";
import BoardNavContextMenu from "./BoardNavContextMenu";
import Modal from "../modal/Modal";
import NavModal from "../navModal/NavModal";

export default function BoardNav({ boardId, boards, boardColumns, tasks }) {
  const board = boards.find((board) => board.id === +boardId);

  return (
    <div className="flex items-center justify-between bg-primary-900 pr-5 lg:p-5">
      <div className="w-36 md:w-auto mr-auto md:text-lg p-6 lg:text-xl font-medium text-accent-300 [word-spacing:4px] flex items-center gap-2 lg:gap-4">
        <h2 className="overflow-hidden truncate">
          {board.boardName.toUpperCase()}
        </h2>
        {/* Clicking this will open sideNav */}
        <Modal>
          <Modal.Open opens="navaside">
            <button className="lg:hidden">
              <ChevronDownIcon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
            </button>
          </Modal.Open>
          <Modal.Window name="navaside">
            <NavModal boards={boards} />
          </Modal.Window>
        </Modal>
      </div>

      <AddTaskBtn boardColumns={boardColumns} tasks={tasks} />

      <BoardNavContextMenu boards={boards} />
    </div>
  );
}
