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
          <button className="bg-gradient-to-r from-purple-500  via-red-500 to-blue-500 p-2 rounded-2xl">
            <div className="flex items-center gap-4 bg-primary-900 hover:bg-primary-800 transition-all duration-300 py-4 px-6 rounded-2xl">
              <Image
                className="object-cover h-full"
                src="https://authjs.dev/img/providers/google.svg"
                alt="Google logo"
                height="24"
                width="24"
              />
              <span className="tracking-wide [word-spacing:6px] text-xl font-medium">
                Continue with Google
              </span>
            </div>
          </button>
        </form>
      </div>
    </main>
  );
}
