import { HomeIcon } from "@heroicons/react/24/solid";
import AddBoard from "../navAside/AddBoard";
import Boards from "../navAside/Boards";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavModal({ boards, onCloseModal }) {
  return (
    <div className="bg-primary-900 flex flex-col gap-2">
      <div className="px-6 py-2 mx-auto">
        <Link
          href="/boards"
          className="flex items-center gap-2 text-lg md:text-xl"
          onClick={() => onCloseModal?.()}
        >
          <span>
            <HomeIcon className="h-5 w-5 text-accent-200" />
          </span>
          <span className="text-accent-200 text-base md:text-lg">Home</span>
        </Link>
      </div>

      <div className="flex flex-col gap-4 border-t-2 border-primary-700 pt-6">
        {boards.length ? (
          <>
            {" "}
            <h3 className="px-6 uppercase text-sm font-medium text-primary-300  [word-spacing:4px]">
              All boards ({boards.length})
            </h3>
            <Boards boards={boards} />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
