"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const ClientGroupLayout = ({ group, children }: { group: any, children: React.ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="relative flex flex-1 h-full">
      <button
        className="absolute top-4 right-4 z-30 md:hidden p-2 text-white bg-zinc-800 rounded-md"
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

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm">
          Configurações
        </button>
      </aside>

      <div className="flex-1 overflow-y-auto p-6 md:ml-0">
        {children}
      </div>
    </section>
  );
};

export default ClientGroupLayout;