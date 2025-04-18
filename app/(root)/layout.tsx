import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SidebarLayout from "@/components/SidebarLayout";
import type { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  return (
    <main className="flex flex-col h-screen w-screen">
      <SidebarLayout>
        {children}
      </SidebarLayout>
    </main>
  );
};

export default Layout;