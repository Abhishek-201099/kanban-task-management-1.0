import { Suspense } from "react";

import Logo from "@/app/_components/ui/Logo";
import Loading from "@/app/boards/loading";
import SignoutButton from "./SignoutButton";
import NavBoards from "./NavBoards";

export default function NavAside() {
  return (
    <div className="bg-primary-900 grid grid-rows-[1fr_4fr_1fr]">
      <Logo />
      <Suspense fallback={<Loading />}>
        <NavBoards />
      </Suspense>
      <div className="flex items-center justify-center">
        <SignoutButton />
      </div>
    </div>
  );
}
