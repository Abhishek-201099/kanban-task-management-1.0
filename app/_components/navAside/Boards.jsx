"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import boardIcon from "@/public/icon-board.svg";

export default function Boards({ boards }) {
  const pathName = usePathname();

  return (
    <div className="w-full h-80 flex flex-col gap-2 overflow-scroll  scrollbar-hide">
      {boards.map((board, i) => (
        <Link
          href={`/boards/${board.id}`}
          key={i}
          className={`${
            +pathName.split("/").at(2) === board.id ? "bg-primary-700" : ""
          } flex items-center gap-4 hover:bg-primary-800  pl-6 pr-4 py-4 rounded-br-full rounded-tr-full [word-spacing:4px]`}
        >
          <span>
            <Image
              src={boardIcon}
              className="h-4 w-4 md:h-5 md:w-5"
              alt={board.boardName}
            />
          </span>
          <span className="flex-1 text-base md:text-lg overflow-hidden truncate">
            {board.boardName}
          </span>
        </Link>
      ))}
    </div>
  );
}
