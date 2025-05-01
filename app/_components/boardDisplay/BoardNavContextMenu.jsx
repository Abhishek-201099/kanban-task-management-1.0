"use client";

import { usePathname } from "next/navigation";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

import UpdateBoardNameForm from "./UpdateBoardNameForm";
import { deleteBoardAction } from "@/app/_lib/actions";
import Menus from "@/app/_components/menus/Menus";
import Modal from "@/app/_components/modal/Modal";
import DeleteResourceForm from "@/app/_components/ui/DeleteResourceForm";

export default function BoardNavContextMenu({ boards }) {
  const boardId = +usePathname().split("/").at(2);
  const board = boards.find((board) => board.id === boardId);

  return (
    <Modal>
      <Menus>
        <div className="flex items-center justify-end">
          <Menus.Toggle id={board.id} direction="vertical" />
          <Menus.List id={board.id}>
            <Modal.Open opens="updateBoardNameForm">
              <Menus.Button
                icon={<PencilSquareIcon className="h-6 w-6 text-primary-500" />}
              >
                Edit board Name
              </Menus.Button>
            </Modal.Open>
            <Modal.Open opens="deleteBoard">
              <Menus.Button
                icon={<TrashIcon className="h-6 w-6 text-red-400" />}
              >
                Delete board
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </div>
      </Menus>
      <Modal.Window name="updateBoardNameForm">
        <UpdateBoardNameForm boards={boards} />
      </Modal.Window>
      <Modal.Window name="deleteBoard">
        <DeleteResourceForm
          resourceName={board.boardName}
          onConfirm={() => deleteBoardAction(+boardId)}
        />
      </Modal.Window>
    </Modal>
  );
}
