import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { socket } from "@/lib/socket";

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
  // Establish socket connection
  if (!socket.connected) {
    socket.connect()
    console.log('Socket connected')
  }
  return (
    <html lang="en">
      <body className={inter.className}>
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
