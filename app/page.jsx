import Image from "next/image";

import kanbanLogo from "@/public/logo-light.svg";
import scrum from "@/public/scrum3.svg";
import ProceedToBoardBtn from "@/app/_components/ui/ProceedToBoardBtn";

export default function Page() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2  h-screen">
      <div className="relative hidden md:block">
        <Image
          fill
          src={scrum}
          className="object-contain"
          alt="Kanban task management"
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-32">
        <Image
          className="w-auto h-8 md:h-10 lg:h-12"
          src={kanbanLogo}
          alt="Kanban task management"
        />

        <ProceedToBoardBtn />
      </div>
    </main>
  );
}
