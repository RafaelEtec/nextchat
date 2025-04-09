"use client";

import Loading from "@/components/Loading";
import Logo from "@/components/Logo";
import LogoIcon from "@/components/LogoIcon";
import Logout from "@/components/Logout";
import Messages from "@/components/Messages";
import SignIn from "@/components/SignIn";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const {data: session} = useSession();

  return (
    <div className="flex h-full w-full">
      <div
        className={cn(
          "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-none bg-my-background md:flex-row",
          "h-screen",
        )}
      >
        <Sidebar open={open} setOpen={setOpen} animate={true}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {/* TODO: SHOW GROUPS */}
              </div>
            </div>
            <div className="flex flex-row overflow-x-hidden overflow-y-auto">
              {open && session &&
                <SidebarLink
                  className="font-normal"
                  link={{
                    label: `${session?.user?.name || ""}`,
                    href: "#",
                    icon: (
                      <Image
                        src={session?.user?.image || 'null'}
                        className="h-12 w-12 shrink-0 rounded-full"
                        width={50}
                        height={50}
                        alt="Avatar"
                      />
                    ),
                  }}
                />
              }
              {open && !session && <SignIn />}
              {open && session && <Logout />}
            </div>
          </SidebarBody>
        </Sidebar>
        {!session ? (
          <Loading />
        ) : (
          <Messages />
        )}
      </div>
    </div>
  );
}