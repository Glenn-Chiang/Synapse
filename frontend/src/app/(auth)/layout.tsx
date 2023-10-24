import { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
