"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlinks = () => {
  const pathname = usePathname();
  return (
    <nav className="text-xl py-2 flex gap-4">
      <Navlink href="/channels" currentPath={pathname}>
        Channels
      </Navlink>
      <Navlink href="/chats" currentPath={pathname}>
        Chats
      </Navlink>
    </nav>
  );
};

type NavlinkProps = {
  href: string;
  currentPath: string;
  children: React.ReactNode;
};

const Navlink = ({ href, currentPath, children }: NavlinkProps) => {
  const isActive = href === currentPath;
  return (
    <Link href={href} className={`${isActive ? "text-sky-500 underline underline-offset-8" : ""}`}>
      {children}
    </Link>
  );
};

export { Navlinks };
