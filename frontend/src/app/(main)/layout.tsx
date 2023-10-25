import { MessageListener } from "@/components/MessageListener";
import { UserProvider } from "@/components/UserProvider";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Synapse",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = getCurrentUser();

  return (
    <html lang="en">
      <body>
        <UserProvider user={currentUser}>
          <MessageListener />
          <Topbar />
          <div className="mt-16 p-4 py-0 sm:px-10">{children}</div>
        </UserProvider>
      </body>
    </html>
  );
}

function Topbar() {
  return (
    <nav className="z-10 bg-slate-950 w-screen h-16 shadow p-4 fixed top-0 left-0 font-medium flex items-center text-xl">
      <Link href={"/"} className="flex gap-2 items-center">
        <Image
          src={"https://static.thenounproject.com/png/40466-200.png"}
          alt=""
          width={40}
          height={40}
          className="invert"
        />
        Synapse
      </Link>
    </nav>
  );
}