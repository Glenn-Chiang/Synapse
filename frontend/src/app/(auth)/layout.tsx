import { Metadata } from "next";
import '../../globals.css'

export const metadata: Metadata = {
  title: "Synapse",
};

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">{children}</body>
    </html>
  );
}
