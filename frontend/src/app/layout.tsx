import { MessageListener } from '@/components/MessageListener';
import { socket } from "@/lib/socket";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const revalidate = 0

export const metadata: Metadata = {
  title: "Synapse",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // // Establish socket connection
  if (!socket.connected) {
    socket.connect()
  }
  return (
    <html lang="en">
      <body >
        <MessageListener/>
        <Topbar />
        <div className="mt-16 p-4 max-w-full">{children}</div>
      </body>
    </html>
  );
}

function Topbar() {
  return (
    <nav className="z-10 bg-slate-950 w-screen h-16 shadow p-4 fixed top-0 left-0 font-medium flex items-center text-xl">
      <div className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faBars} />
        <Link href={'/'}>Synapse</Link>
      </div>
    </nav>
  );
}
