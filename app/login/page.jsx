import Image from "next/image";
import { signInAction } from "../_lib/actions";
import SigninBtn from "../_components/ui/SigninBtn";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <main className="flex  items-center justify-center h-screen">
      <div className="flex flex-col gap-16 md:gap-20 lg:gap-24">
        <h1 className="text-lg md:text-xl lg:text-3xl [word-spacing:6px]">
          Sign in to access your boards
        </h1>
        <SigninBtn />
      </div>
    </main>
  );
}
