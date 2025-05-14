import { auth } from "@/app/_lib/auth";
import { getAccount } from "../../_lib/data-service";
import AccountSettingsForm from "@/app/_components/boardDisplay/AccountSettingsForm";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";

export const metadata = {
  title: "Settings",
};

export default async function Page() {
  const session = await auth();
  const account = await getAccount(session.user.email);

  return (
    <main className="h-full p-8 md:p-20">
      <h1 className="text-xl md:text-2xl lg:text-4xl text-accent-500 uppercase [word-spacing:10px] tracking-wider font-semibold mb-10">
        Profile settings
      </h1>

      <AccountSettingsForm account={account} />

      <Link
        href="/boards"
        className="flex items-center gap-2 mt-20 border-2 border-primary-600 rounded-xl w-fit p-3 hover:bg-primary-800 transition-all"
      >
        <span>
          <ArrowLongLeftIcon className="h-4 w-4 md:h-5 md:w-5" />
        </span>
        <span className="text-sm md:text-base lg:text-lg [word-spacing:4px]">
          Go back
        </span>
      </Link>
    </main>
  );
}
