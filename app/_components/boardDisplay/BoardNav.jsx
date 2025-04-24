import AddTaskBtn from "./AddTaskBtn";
import BoardNavContextMenu from "./BoardNavContextMenu";

export default function BoardNav({ boardId, boards, boardColumns }) {
  const board = boards.find((board) => board.id === +boardId);

  return (
    <div className="flex items-center justify-between bg-primary-900 p-8">
      <h2 className="mr-auto text-3xl font-medium text-accent-300 [word-spacing:4px]">
        {board.boardName}
      </h2>

      <AddTaskBtn boardColumns={boardColumns} />

      <BoardNavContextMenu boards={boards} />
    </div>
  );
}
