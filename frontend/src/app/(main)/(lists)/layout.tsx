import Link from "next/link";
import { Navlinks } from "./NavLinks";

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navlinks />
      {children}
    </main>
  );
}
