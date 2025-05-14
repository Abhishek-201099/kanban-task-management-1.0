import Image from "next/image";
import Link from "next/link";

import kanbanLogo from "@/public/logo-light.svg";

export default function Logo() {
  return (
    <Link href="/boards" className="flex justify-start items-center pl-6">
      <Image src={kanbanLogo} className="w-70" alt="Kanban task management" />
    </Link>
  );
}
