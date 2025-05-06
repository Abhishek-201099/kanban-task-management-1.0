import { TrashIcon } from "@heroicons/react/24/solid";
import Menus from "../menus/Menus";
import Modal from "../modal/Modal";
import DeleteResourceForm from "../ui/DeleteResourceForm";
import { deleteColumnAction } from "@/app/_lib/actions";

export default function ColContextMenu({ boardColumn }) {
  return (
    <div className="opacity-0 group-hover:opacity-100">
      <Modal>
        <Menus>
          <Menus.Toggle id={boardColumn.id} direction="horizontal" />
          <Menus.List id={boardColumn.id}>
            <Modal.Open opens="deleteColumnForm">
              <Menus.Button
                icon={<TrashIcon className="h-6 w-6 text-red-400" />}
              >
                Delete column
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus>
        <Modal.Window name="deleteColumnForm">
          <DeleteResourceForm
            resourceName={boardColumn.columnName}
            onConfirm={async () =>
              await deleteColumnAction(boardColumn.id, boardColumn.boardId)
            }
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}
