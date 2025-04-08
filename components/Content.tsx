"use client";

import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import Logo from "./Logo";
import LogoIcon from "./LogoIcon";
import Messages from "./Messages";

const UseSidebar = () => {
    const [open, setOpen] = useState(false);
    
  return (
    <div
      className={cn(
        "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-none bg-my-background md:flex-row",
        "h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto bg-">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {/* TODO: SHOW GROUPS */}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "RafaelEtec",
                href: "#",
                icon: (
                  <Image
                    src="https://avatars.githubusercontent.com/rafaeletec"
                    className="h-12 w-12 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Messages />
    </div>
  )
}

export default UseSidebar