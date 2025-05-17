import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function notFound() {
  return (
    <main className="flex justify-center items-center flex-col gap-6 h-screen [word-spacing:4px]">
      <h1 className="text-base md:text-xl lg:text-3xl font-semibold uppercase">
        Not found
      </h1>
      <p className="text-xs md:text-sm lg:text-base text-primary-400">
        Could not find requested resource
      </p>

      <Link
        href="/boards"
        className="bg-accent-500 text-primary-800 px-6 py-3 text-base lg:text-lg flex items-center gap-4"
      >
        <span>
          <ArrowLeftIcon className="h-4 w-4" />
        </span>
        <span className="font-semibold">Go back</span>
      </Link>
    </main>
  );
}
