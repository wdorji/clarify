import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/sessionProvider";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/login";
import SidebarWithHeader from "../components/sidebar";
import ClientProvider from "../components/clientProvider";
import DocumentContextProvider from "../components/documentContextProvider";
import ImagesContextProvider from "../components/imagesContextProvider";

import { Providers } from "./providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <ImagesContextProvider>
          <DocumentContextProvider>
            <SessionProvider session={session}>
              <Providers>
                {session ? (
                  <div className="flex bg-white border-[2px] border-black ">
                    <SidebarWithHeader />
                    {children}
                    <ClientProvider />
                  </div>
                ) : (
                  <Login />
                )}
              </Providers>
            </SessionProvider>
          </DocumentContextProvider>
        </ImagesContextProvider>
      </body>
    </html>
  );
}
