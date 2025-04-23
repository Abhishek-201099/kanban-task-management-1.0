import Image from "next/image";
import Link from "next/link";

import kanbanLogo from "@/public/logo-light.svg";

export default function Logo() {
  return (
    <Link href="/boards" className="flex justify-center items-center">
      <Image src={kanbanLogo} className="w-60" alt="Kanban task management" />
    </Link>
  );
}
