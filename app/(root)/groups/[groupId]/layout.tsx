import type { ReactNode } from "react";
import { getGroupById } from "@/lib/actions/groups";
import { notFound } from "next/navigation";

type Props = {
  children: ReactNode;
  params: { groupId: string };
};

const GroupsLayout = async ({ children, params }: Props) => {
    const id = (await params).groupId;
    const group = await getGroupById(id);

    if (!group) return notFound();

    return (
        <section className="flex flex-col flex-1 overflow-y-auto">
            <div className="flex items-center gap-4 p-4 border-b border-zinc-800">
                <img
                    src={group.thumbnail}
                    alt={group.name}
                    className="h-16 w-16 rounded-full object-cover"
                />
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-white">{group.name}</h1>
                    <p className="text-sm text-zinc-400">{group.description}</p>
                </div>

                <div className="ml-auto">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm">
                        Configurações
                    </button>
                </div>
            </div>

            <div className="p-4">
                {children}
            </div>
        </section>
    );
};

export default GroupsLayout;