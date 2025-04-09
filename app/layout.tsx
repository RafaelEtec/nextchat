import { auth } from "@/auth";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextChat",
  description: "Real Time Chat-App",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={`antialiased`}>
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}

export default RootLayout;