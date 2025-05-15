import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import Menus from "../menus/Menus";
import Modal from "../modal/Modal";
import DeleteResourceForm from "../ui/DeleteResourceForm";
import { deleteColumnAction } from "@/app/_lib/actions";
import EditColumnNameForm from "./EditColumnNameForm";

export default function ColContextMenu({ boardColumn, boardColumns }) {
  return (
    <div className="opacity-0 group-hover:opacity-100">
      <Modal>
        <Menus>
          <Menus.Toggle id={boardColumn.id} direction="horizontal" />
          <Menus.List id={boardColumn.id}>
            <Modal.Open opens="deleteColumnForm">
              <Menus.Button
                icon={<TrashIcon className="h-5 w-5  text-red-400" />}
              >
                Delete column
              </Menus.Button>
            </Modal.Open>
            <Modal.Open opens="editColumnNameForm">
              <Menus.Button
                icon={
                  <PencilSquareIcon className="h-5 w-5  text-primary-500" />
                }
              >
                Edit column name
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
        <Modal.Window name="editColumnNameForm">
          <EditColumnNameForm
            boardColumn={boardColumn}
            boardColumns={boardColumns}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}
