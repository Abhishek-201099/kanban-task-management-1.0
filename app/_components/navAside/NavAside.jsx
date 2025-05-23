import { Suspense } from "react";

import Logo from "@/app/_components/ui/Logo";
import Loading from "@/app/boards/loading";
import SignoutButton from "./SignoutButton";
import NavBoards from "./NavBoards";
import SettingsButton from "./SettingsButton";

export default function NavAside() {
  return (
    <div className="hidden bg-primary-900  lg:grid lg:grid-rows-[1fr_4fr_1fr] lg:grid-cols-1">
      <Logo />
      <Suspense fallback={<Loading />}>
        <NavBoards />
      </Suspense>
      <div className="flex flex-col gap-6 items-center justify-center border-t-2 border-primary-800">
        <SettingsButton />
        <SignoutButton />
      </div>
    </div>
  );
}
