import { Plus_Jakarta_Sans } from "next/font/google";
import "./_styles/globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Kanban task management",
    default: "Welcome | Kanban task management",
  },
  description:
    "A Kanban task management is a digital platform that helps users organize and track tasks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.className} bg-primary-950 text-primary-50 antialiased h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
