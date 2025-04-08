import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextChat",
  description: "Real Time Chat-App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
