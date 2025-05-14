import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function SettingsButton() {
  return (
    <Link
      href="/boards/settings"
      className="flex items-center gap-2 hover:text-primary-300"
    >
      <span>
        <Cog6ToothIcon className="h-5 w-5 text-accent-200 " />
      </span>
      <span className="text-sm text-accent-200 hidden lg:block">Settings</span>
    </Link>
  );
}
