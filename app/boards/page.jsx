import Image from "next/image";
import { ArrowUpLeftIcon } from "@heroicons/react/24/solid";

import { auth } from "@/app/_lib/auth";
import { getAccount, getBoards } from "@/app/_lib/data-service";
import BoardBtn from "../_components/navModal/BoardBtn";
import SignoutButton from "../_components/navAside/SignoutButton";
import SettingsButton from "../_components/navAside/SettingsButton";

export default async function Page() {
  const session = await auth();
  const account = await getAccount(session.user.email);
  const boards = await getBoards(account.id);

  return (
    <main className="h-screen p-5 md:p-8 flex flex-col justify-start gap-24">
      <div className="flex justify-between items-center">
        <Image
          src={session.user.image}
          alt={account.fullName}
          height={90}
          width={90}
          className="rounded-full border-2 md:border-4 border-accent-400 h-12 w-12 md:h-14 md:w-14 lg:h-20 lg:w-20"
        />

        <button className="lg:hidden">
          <SettingsButton />
        </button>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        <span className="text-xl md:text-2xl tracking-tighter font-thin">
          Welcome,
        </span>
        <span className="text-3xl md:text-3xl text-accent-500 [word-spacing:4px]">
          {account.fullName}
        </span>
      </div>

      <p className="hidden  lg:flex lg:items-center lg:gap-6 lg:mt-8">
        <span>
          <ArrowUpLeftIcon className="h-6" />
        </span>
        <span className="text-lg text-primary-400 tracking-wide [word-spacing:4px]">
          {!boards.length
            ? "Create a board to start planning !"
            : "Select a board and start planning !"}
        </span>
      </p>

      <BoardBtn boards={boards} />

      <div className="lg:hidden">
        <SignoutButton />
      </div>
    </main>
  );
}
