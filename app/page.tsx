"use client";

import Loading from "@/components/Loading";
import LoadingGroups from "@/components/LoadingGroups";
import Logo from "@/components/Logo";
import LogoIcon from "@/components/LogoIcon";
import Logout from "@/components/Logout";
import Messages from "@/components/Messages";
import SidebarFooter from "@/components/SidebarFooter";
import SignIn from "@/components/SignIn";
import { AnimatedModalDemo } from "@/components/triggerModal"
import { Sidebar, SidebarBody, SidebarGroupLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { sidebarLinks } from "@/data";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [openRoom, setOpenRoom] = useState(0);
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
          <SidebarBody className="justify-between gap-4">
            {/* Sidebar Header */}
            <div className="flex flex-col items-center">
              {open ? <Logo /> : <LogoIcon />}
            </div>
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto no-scrollbar">
              <div className="mt-8 flex flex-col gap-2">
                {/* Sidebar Content */}
                {session ? (
                  <>
                    {sidebarLinks.map((link, i) => (
                      <AnimatedModalDemo key={i} open={open} link={link}  />
                    ))}
                    </>
                  ) : (
                    <LoadingGroups open={open}/>
                  )
                }
              </div>
            </div>
            <div className="flex flex-row justify-between overflow-x-hidden overflow-y-auto">
              {/*  Sidebar Footer */}
              {session ?
                <>
                  <SidebarFooter open={open} />
                  {open && <Logout />}
                </>
                : (
                  <div className="flex flex-col h-full w-full space-y-2">
                    <SignIn provider={"github"} open={open}/>
                    <SignIn provider={"google"} open={open}/>
                  </div>
                )
              }
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