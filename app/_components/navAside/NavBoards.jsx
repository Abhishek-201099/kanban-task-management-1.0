import { getAccount, getBoards } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";
import Boards from "./Boards";
import AddBoard from "./AddBoard";

export default async function NavBoards() {
  const session = await auth();
  const account = await getAccount(session.user.email);
  const boards = await getBoards(account.id);

  return (
    <div className="flex flex-col justify-between pb-4 gap-3">
      {boards.length ? (
        <>
          {" "}
          <h3 className="px-6 uppercase font-medium lg:text-sm text-primary-300  [word-spacing:4px]">
            All boards ({boards.length})
          </h3>
          <Boards boards={boards} />
        </>
      ) : (
        ""
      )}
      <AddBoard boards={boards} />
    </div>
  );
}
