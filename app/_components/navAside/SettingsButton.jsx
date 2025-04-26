import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function SettingsButton() {
  return (
    <Link
      href="/boards/settings"
      className="flex items-center gap-2 hover:text-primary-300"
    >
      <span>
        <Cog6ToothIcon className="h-6 w-6" />
      </span>
      <span className="text-lg">Settings</span>
    </Link>
  );
}
