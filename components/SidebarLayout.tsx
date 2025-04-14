"use client";

import { useChatStore } from "@/data/store/useChatStore";
import {
  Sidebar,
  SidebarBody,
  SidebarGroupLink,
} from "@/components/ui/sidebar";
import Logo from "@/components/Logo";
import LogoIcon from "@/components/LogoIcon";
import Logout from "@/components/Logout";
import SidebarFooter from "@/components/SidebarFooter";
import SignIn from "@/components/SignIn";
import LoadingGroups from "@/components/LoadingGroups";
import { sidebarLinks } from "@/data";
import { cn } from "@/lib/utils";
import React from "react";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open, setOpen } = useChatStore();

  return (
    <div className="flex h-full w-full">
      <div
        className={cn(
          "mx-auto flex w-full flex-1 flex-col overflow-hidden rounded-md border border-none bg-my-background md:flex-row",
          "h-screen"
        )}
      >
        <Sidebar open={open} setOpen={setOpen} animate={true}>
          <SidebarBody className="justify-between gap-4">
            {/* Sidebar Header */}
            <div className="flex flex-col items-center">
              {open ? <Logo /> : <LogoIcon />}
            </div>
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto no-scrollbar">
              <div className="mt-8 flex flex-col gap-2">
                {/* Sidebar Content */}
                {sidebarLinks.map((link) => (
                    <SidebarGroupLink key={link.href} link={link} isOpen={open} />
                ))}
              </div>
            </div>
            <div className="flex flex-row justify-between overflow-x-hidden overflow-y-auto">
                {/* Sidebar Footer */}
                <SidebarFooter open={open} />
                {open && <Logout />}
            </div>
          </SidebarBody>
        </Sidebar>
        {children}
      </div>
    </div>
  );
}