"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import boardIcon from "@/public/icon-board.svg";

export default function Boards({ boards }) {
  const pathName = usePathname();

  return (
    <div className="h-80 flex flex-col gap-5 overflow-scroll  scrollbar-hide">
      {boards.map((board, i) => (
        <Link
          href={`/boards/${board.id}`}
          key={i}
          className={`${
            +pathName.split("/").at(2) === board.id ? "bg-primary-700" : ""
          } flex items-center gap-6 hover:bg-primary-800  px-6 py-5 rounded-br-full rounded-tr-full [word-spacing:4px]`}
        >
          <span>
            <Image src={boardIcon} className="h-6 w-6" alt={board.boardName} />
          </span>
          <span className="text-2xl">{board.boardName}</span>
        </Link>
      ))}
    </div>
  );
}
