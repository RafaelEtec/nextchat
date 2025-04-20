"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { getRoomsByGroupId } from "@/lib/actions/rooms";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const ClientGroupLayout = ({ group, children }: { group: any, children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const {data: session} = useSession();

  const fetchRooms = async () => {
    const result = await getRoomsByGroupId(group.id);
    setRooms(result);
    redirect(`/groups/${group.id}/rooms/${result[0].id}`)
  }

  useEffect(() => {
    fetchRooms();
  }, [session?.user?.id]);

  return (
    <section className="flex h-screen overflow-hidden font-roboto">
      <button
        className="absolute z-30 md:hidden p-2 text-white bg-zinc-800 rounded-md"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        className={`
          fixed top-0 left-0 z-20 h-full w-64 bg-zinc-900 border-r border-zinc-800 p-4
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-80 md:block
        `}
      >
        <div className="flex items-center gap-4 mb-4">
          <img
            src={group.thumbnail}
            alt={group.name}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-lg font-bold text-white">{group.name}</h1>
            <p className="text-sm text-zinc-400">{group.description}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          {rooms && rooms.map((room) => (
            <Link key={room.id} href={`/groups/${group.id}/rooms/${room.id}`} className="block p-1 rounded-md hover:bg-zinc-950 transition duration-200">
                <div className="p-2 bg-zinc-800 rounded-md">
                    <h2 className="text-white">{room.name}</h2>
                    <p className="text-sm text-zinc-400">{room.description}</p>
                </div>
            </Link>
          ))}
        </div>

      </aside>

      <div className="flex flex-col flex-1">
        {children}
      </div>
    </section>
  );
};

export default ClientGroupLayout;