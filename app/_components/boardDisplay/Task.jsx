import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

import Menus from "../menus/Menus";
import Modal from "../modal/Modal";
import TaskInfo from "./TaskInfo";
import DeleteResourceForm from "../ui/DeleteResourceForm";
import { deleteTaskAction } from "@/app/_lib/actions";
import CreateEditTaskForm from "./CreateEditTaskForm";

export default function Task({ task, tasks, subtasksForCol, boardColumns }) {
  const subtaskForTask = subtasksForCol.filter(
    (subtask) => subtask.taskId === task.id
  );

  return (
    <div className="task-item flex items-center  border border-primary-800 border-dashed rounded-xl px-4 py-4 hover:border-opacity-100 border-opacity-0">
      <div className="flex-1">
        <Modal>
          <Modal.Open opens="taskInfo">
            <div className="task-item-heading px-12 py-4 [word-spacing:4px] bg-primary-700 hover:bg-primary-600 transition-all cursor-pointer rounded-xl shadow-md shadow-primary-800">
              <div className="text-xl font-semibold mb-4">{task.taskName}</div>
              <div className="text-primary-400 text-base font-bold">
                {
                  subtaskForTask.filter((subtask) => subtask.isChecked === true)
                    .length
                }{" "}
                out of {subtaskForTask.length} subtasks
              </div>
            </div>
          </Modal.Open>
          <Modal.Window name="taskInfo">
            <TaskInfo
              task={task}
              subtaskForTask={subtaskForTask}
              boardColumns={boardColumns}
            />
          </Modal.Window>
        </Modal>
      </div>

      <div className="task-item-context opacity-0">
        <Modal>
          <Menus>
            <Menus.Toggle id="task-context" direction="vertical" />
            <Menus.List id="task-context">
              <Modal.Open opens="editTaskForm">
                <Menus.Button icon={<PencilSquareIcon className="h-6 w-6" />}>
                  Edit task
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="deleteTaskForm">
                <Menus.Button
                  icon={<TrashIcon className="h-6 w-6 text-red-400" />}
                >
                  Delete task
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus>
          <Modal.Window name="editTaskForm">
            <CreateEditTaskForm
              curTask={task}
              boardColumns={boardColumns}
              tasks={tasks}
              subtaskForTask={subtaskForTask}
            />
          </Modal.Window>
          <Modal.Window name="deleteTaskForm">
            <DeleteResourceForm
              resourceName={task.taskName}
              onConfirm={async () => {
                await deleteTaskAction(task);
              }}
            />
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
}
