import Image from "next/image";
import { auth } from "../_lib/auth";
import { getAccount, getBoards } from "../_lib/data-service";
import { ArrowUpLeftIcon } from "@heroicons/react/24/solid";

export const metadata = {
  title: "Boards",
};

export default async function Page() {
  const session = await auth();
  const account = await getAccount(session.user.email);
  const boards = await getBoards(account.id);

  return (
    <main className="h-full px-14 py-20 flex flex-col justify-start gap-20">
      <Image
        src={session.user.image}
        alt={account.fullName}
        height={90}
        width={90}
        className="rounded-full border-4 border-accent-400 "
      />

      <div className="flex flex-col gap-8">
        <span className="text-4xl tracking-tighter font-thin">Welcome,</span>
        <span className="text-5xl text-accent-500">{account.fullName}</span>
      </div>

      <p className="flex items-center gap-6 mt-8">
        <span>
          <ArrowUpLeftIcon className="h-6" />
        </span>
        <span className="text-lg text-primary-400 tracking-wide [word-spacing:4px]">
          {!boards.length
            ? "Create a board to start planning !"
            : "Select a board and start planning !"}
        </span>
      </p>

      <p></p>
    </main>
  );
}
