import Image from "next/image";

import { signInAction } from "@/app/_lib/actions";

export default function SigninBtn() {
  return (
    <form className="flex items-center justify-center" action={signInAction}>
      <button className="bg-gradient-to-r from-purple-500  via-red-500 to-blue-500 p-1 md:p-2 rounded-2xl">
        <div className="flex items-center gap-2 md:gap-4 bg-primary-900 hover:bg-primary-800 transition-all duration-300 py-4 px-6 rounded-2xl">
          <Image
            className=""
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google logo"
            height="24"
            width="24"
          />
          <span className="tracking-wide [word-spacing:6px] text-sm md:text-base font-medium">
            Continue with Google
          </span>
        </div>
      </button>
    </form>
  );
}
