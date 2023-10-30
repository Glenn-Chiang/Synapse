import { MessageListener } from "@/components/MessageListener";
import { UserProvider } from "@/components/UserProvider";
import { getCurrentUser } from "@/lib/getCurrentUser";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Topbar } from "@/components/Topbar";
import "../../globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Synapse",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = getCurrentUser();
  const token = cookies().get('token')?.value

  return (
    <html lang="en">
      <body>
        <UserProvider user={currentUser}>
          <MessageListener token={token}/>
          <Topbar />
          <div className="mt-16 p-4 py-0 sm:px-10">{children}</div>
        </UserProvider>
      </body>
    </html>
  );
}
