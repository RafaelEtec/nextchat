import { useSession } from "next-auth/react";
import { SidebarLink } from "./ui/sidebar";

const SidebarFooter = ({
    open,
}: {
    open: boolean
}) => {
    const {data: session} = useSession();
    console.log(session?.user?.image)

    return (
            <SidebarLink
            className="font-roboto"
            link={{
            label: `${open ? session?.user?.name : ""}`,
            href: "#",
                icon: (
                    <img
                        src={`${session?.user?.image}`}
                        className="h-12 w-12 shrink-0 rounded-full"
                        width={50}
                        height={50}
                        alt="Avatar"
                    />
                ),
            }}
        />
    );
};

export default SidebarFooter