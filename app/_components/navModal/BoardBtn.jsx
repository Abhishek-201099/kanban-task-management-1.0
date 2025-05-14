"use client";

import { FolderOpenIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import Modal from "../modal/Modal";
import CreateBoardForm from "../navAside/CreateBoardForm";
import NavModal from "./NavModal";
import AddBoard from "../navAside/AddBoard";

export default function BoardBtn({ boards }) {
  return (
    <div className="flex flex-col gap-4">
      {boards.length !== 0 && (
        <Modal>
          <Modal.Open opens="openNavModal">
            <button className="md:w-1/2 flex items-center gap-2 md:gap-4 lg:hidden rounded-br-full rounded-tr-full font-medium tracking-tighter [word-spacing:4px] text-accent-400 hover:bg-primary-800 px-2 py-4 md:px-6 md:py-5 hover:text-accent-300 transition-all">
              <span>
                <FolderOpenIcon className="h-5 w-5 md:h-6 md:w-6" />
              </span>
              <span className="text-base md:text-lg">
                Select board and start planning !
              </span>
            </button>
          </Modal.Open>

          <Modal.Window name="openNavModal">
            <NavModal boards={boards} />
          </Modal.Window>
        </Modal>
      )}
      <Modal>
        <Modal.Open opens="createBoardForm">
          <button className="md:w-1/2 flex items-center gap-2 md:gap-4 lg:hidden rounded-br-full rounded-tr-full font-medium tracking-tighter [word-spacing:4px] text-accent-400 hover:bg-primary-800 px-2 py-4 md:px-6 md:py-5 hover:text-accent-300 transition-all">
            <span>
              <PlusCircleIcon className="h-5 w-5 md:h-6 md:w-6" />
            </span>
            <span className="text-base md:text-lg">Create new board</span>
          </button>
        </Modal.Open>

        <Modal.Window name="createBoardForm">
          <CreateBoardForm boards={boards} />
        </Modal.Window>
      </Modal>
    </div>
  );
}
