import { ReactNode } from "react";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();

    if (session) redirect("/");

    return (
      <main>
        <section>
          <div className="flex h-screen w-full">
            {children}
          </div>
        </section>
      </main>
    );
};

export default Layout