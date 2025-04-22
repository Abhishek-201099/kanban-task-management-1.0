import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";

import kanbanLogo from "@/public/logo-light.svg";

export default function Page() {
  return (
    <main className="flex  items-center justify-center h-screen">
      <div className="flex flex-col gap-20">
        <Image
          className="w-auto h-20"
          src={kanbanLogo}
          alt="Kanban task management"
        />
        <Link
          className=" flex gap-4 items-center justify-center  border px-6 py-4  rounded-2xl font-medium text-lg border-primary-600 hover:bg-primary-800 transition-all"
          href="/boards"
        >
          <span className="tracking-wide [word-spacing:6px]">
            Proceed to boards
          </span>{" "}
          <ArrowRightCircleIcon className="h-6 w-6" />
        </Link>
      </div>
    </main>
  );
}
