import BoardDisplay from "@/app/_components/boardDisplay/BoardDisplay";
import BoardNav from "@/app/_components/boardDisplay/BoardNav";
import { auth } from "@/app/_lib/auth";
import {
  getAccount,
  getBoard,
  getBoardColumns,
  getBoards,
  getSubtasksForTask,
  getTasks,
} from "@/app/_lib/data-service";

export async function generateMetadata({ params }) {
  const { boardId } = params;
  const board = await getBoard(boardId);
  return { title: board.boardName };
}

export default async function Page({ params }) {
  const { boardId } = params;
  const session = await auth();
  const account = await getAccount(session.user.email);
  const boards = await getBoards(account.id);
  const boardColumns = await getBoardColumns(boardId);
  const tasks = await getTasks(account.id, boardId);
  const subtasks = await getSubtasksForTask(boardId, account.id);

  return (
    <div className="grid grid-rows-[auto_1fr] h-screen">
      <BoardNav
        boards={boards}
        boardId={boardId}
        boardColumns={boardColumns}
        tasks={tasks}
      />
      <BoardDisplay
        boardColumns={boardColumns}
        tasks={tasks}
        subtasks={subtasks}
      />
    </div>
  );
}
