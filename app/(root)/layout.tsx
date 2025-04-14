import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SidebarLayout from "@/components/SidebarLayout";
import type { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  return (
    <main>
        <SidebarLayout>
            {children}
        </SidebarLayout>
    </main>
  );
};

export default Layout;