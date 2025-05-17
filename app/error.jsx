"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center flex-col gap-6 h-screen">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>

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
