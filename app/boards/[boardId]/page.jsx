import BoardNav from "@/app/_components/boardDisplay/BoardNav";
import { auth } from "@/app/_lib/auth";
import {
  getAccount,
  getBoardColumns,
  getBoards,
} from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { boardId } = params;
  const session = await auth();
  const account = await getAccount(session.user.email);
  const boards = await getBoards(account.id);
  const boardColumns = await getBoardColumns(boardId);

  return (
    <div className="grid grid-rows-[auto_1fr]">
      <BoardNav boards={boards} boardId={boardId} boardColumns={boardColumns} />
      <div>board display</div>
    </div>
  );
}
