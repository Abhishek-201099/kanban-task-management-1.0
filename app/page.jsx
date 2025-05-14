import Image from "next/image";
import Link from "next/link";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";

import kanbanLogo from "@/public/logo-light.svg";
import scrum from "@/public/scrum3.svg";

export default function Page() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2  h-screen">
      <div className="relative hidden md:block">
        <Image
          fill
          src={scrum}
          className="object-contain"
          alt="Kanban task management"
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-32">
        <Image
          className="w-auto h-8 md:h-10 lg:h-12"
          src={kanbanLogo}
          alt="Kanban task management"
        />

        <Link
          href="/boards"
          className="bg-gradient-to-r from-purple-500  via-red-500 to-blue-500 p-1 rounded-2xl"
        >
          <div className="flex items-center gap-4 bg-primary-900 hover:bg-primary-800 transition-all duration-300 py-4 px-6 rounded-2xl">
            <span className="tracking-wide [word-spacing:6px] text-sm md:text-base lg:text-lg font-medium">
              Proceed to boards
            </span>
            <ArrowRightCircleIcon className="h-5 w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />
          </div>
        </Link>
      </div>
    </main>
  );
}
