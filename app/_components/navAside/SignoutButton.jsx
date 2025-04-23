import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

import { signOutAction } from "@/app/_lib/actions";

export default function SignoutButton() {
  return (
    <form action={signOutAction}>
      <button className="flex items-center gap-4  hover:text-primary-300">
        <span>
          <ArrowRightStartOnRectangleIcon className="h-8 w-8" />
        </span>
        <span className="text-xl transition-all">Sign out</span>
      </button>
    </form>
  );
}
