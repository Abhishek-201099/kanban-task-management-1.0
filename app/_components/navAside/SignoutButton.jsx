import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

import { signOutAction } from "@/app/_lib/actions";

export default function SignoutButton() {
  return (
    <form action={signOutAction}>
      <button className="flex items-center gap-2  hover:text-primary-300">
        <span>
          <ArrowRightStartOnRectangleIcon className="h-6 w-6" />
        </span>
        <span className="text-lg ">Sign out</span>
      </button>
    </form>
  );
}
