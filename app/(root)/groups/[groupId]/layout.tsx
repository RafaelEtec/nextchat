import type { ReactNode } from "react";
import { getGroupById } from "@/lib/actions/groups";
import { notFound } from "next/navigation";
import ClientGroupLayout from "@/components/ClientGroupLayout";

type Props = {
  children: ReactNode;
  params: { groupId: string };
};

const GroupsLayout = async ({ children, params }: Props) => {
    const id = (await params).groupId;
    const group = await getGroupById(id);

    if (!group) return notFound();

    return (
        <ClientGroupLayout group={group}>
            {children}
        </ClientGroupLayout>
    );
};

export default GroupsLayout;