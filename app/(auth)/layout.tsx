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
          <div className="container relative flex h-screen flex-col items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white border-r border-zinc-700 lg:flex">
              <div className="absolute inset-0 bg-my-background" />
            </div>

            <div className="lg:p-8 flex items-center justify-center h-full w-full">
              <div className="w-full max-w-md px-4 items-center justify-center">
                {children}
                <p className="text-center text-sm text-muted-foreground">
                  By authenticating, you agree to our{" "}
                  Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
};

export default Layout