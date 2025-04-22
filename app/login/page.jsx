import Image from "next/image";
import { signInAction } from "../_lib/actions";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <main className="flex  items-center justify-center h-screen">
      <div className="flex flex-col gap-20">
        <h1 className="text-5xl [word-spacing:6px]">
          Sign in to access your boards
        </h1>
        <form
          className="flex items-center justify-center"
          action={signInAction}
        >
          <button className="flex items-center justify-center gap-6 border rounded-lg px-8 py-6 font-thin text-2xl hover:bg-primary-900 transition-all">
            <Image
              className="object-cover h-full"
              src="https://authjs.dev/img/providers/google.svg"
              alt="Google logo"
              height="24"
              width="24"
            />
            <span>Continue with Google</span>
          </button>
        </form>
      </div>
    </main>
  );
}
