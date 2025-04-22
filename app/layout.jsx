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
  description: "Kanban task management app to manage tasks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.className} bg-primary-950 text-primary-50 antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
