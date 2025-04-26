import { auth } from "@/app/_lib/auth";
import { getAccount } from "../../_lib/data-service";
import AccountSettingsForm from "@/app/_components/boardDisplay/AccountSettingsForm";

export default async function Page() {
  const session = await auth();
  const account = await getAccount(session.user.email);

  return (
    <main className="h-full p-20">
      <h1 className="text-4xl text-accent-500 uppercase [word-spacing:10px] tracking-wider font-semibold mb-10">
        Profile settings
      </h1>
      <AccountSettingsForm account={account} />
    </main>
  );
}
