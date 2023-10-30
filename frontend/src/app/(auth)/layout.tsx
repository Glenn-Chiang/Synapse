import { Metadata } from "next";
import "../../globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;


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
      <body className="bg-slate-950 text-white flex flex-col items-center justify-center h-screen p-4">
        {children}
      </body>
    </html>
  );
}
