import { findGroupsByUserId } from "@/lib/actions/groups";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const LoadingGroups = ({
    open,
}: {
    open: boolean
}) => {
    const {data: session} = useSession();
    const [myGroups, setMyGroups] = useState<Group[] | null>(null);

    const fetchGroupsByUserId = async () => {
        const result = await findGroupsByUserId(session?.user?.id!);
        setMyGroups(result);
    }

    useEffect(() => {
    fetchGroupsByUserId();
    }, [session?.user?.id]);
    return (
        <div className="flex flex-col gap-2 items-start">
            {myGroups &&
                open ? (
                    myGroups?.map((group, idx) => (
                        <div key={"first-array-demo-1" + idx} className="flex flex-1 space-x-2 justify-start">
                            <img src={group.thumbnail} alt="" className="h-20 w-20 rounded-full"/>
                            <div className="space-y-2">
                                <p className="font-bebas-neue text-xl">{group.name}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    myGroups?.map((group, idx) => (
                        <div key={"first-array-demo-1" + idx} className="flex flex-1 justify-start">
                            <img src={group.thumbnail} alt="" className="h-20 w-20 rounded-full"/>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default LoadingGroups