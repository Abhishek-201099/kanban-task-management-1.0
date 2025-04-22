import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createAccount, getAccount } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const existingAccount = await getAccount(user.email);
        if (!existingAccount)
          await createAccount({ email: user.email, fullName: user.name });
        return true;
      } catch {
        return false;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
